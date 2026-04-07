# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Database config : 

```
CREATE TABLE items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title jsonb NOT NULL,
  description jsonb,
  price decimal NOT NULL DEFAULT 0,
  image_url text DEFAULT 'https://placehold.co/600x400',
  category text
);

CREATE TABLE reservations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  item_id uuid REFERENCES items(id) ON DELETE CASCADE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  status text DEFAULT 'pending',
  token uuid DEFAULT gen_random_uuid()
  CONSTRAINT unique_item_reservation UNIQUE (item_id)
);

ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on items" ON items FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on reservations" ON reservations FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable select for anonymous via token" 
ON reservations FOR SELECT 
TO anon 
USING (true);

CREATE POLICY "Enable update for anonymous via token" 
ON reservations FOR UPDATE 
TO anon 
USING (status = 'pending') 
WITH CHECK (status = 'confirmed');

CREATE INDEX idx_reservations_item_id ON reservations(item_id);
```

Add datas : 

```
INSERT INTO items (title, description, price, image_url, category, date_of_availability)
VALUES 
(
  '{"fr": "Machine à laver", "en": "Washing Machine", "es": "Lavadora"}',
  '{"fr": "Notre machine à laver qui a 4 ans, parfaitement fonctionnelle.", "en": "Our washing machine, 4 years old, perfectly functional.", "es": "Nuestra lavadora de 4 años, perfectamente funcional."}',
  85.00,
  'https://ilhkopeaibvltnrbdjnt.supabase.co/storage/v1/object/public/items-images/washingmachine.jpg?width=500&quality=75',
  'appliances',
  '2026-08-28'
),
(
  '{"fr": "Sèche-linge", "en": "Clothes Dryer", "es": "Secadora"}',
  '{"fr": "Sèche-linge performant, idéal pour l''hiver.", "en": "Powerful dryer, ideal for winter.", "es": "Secadora potente, ideal para el invierno."}',
  120.00,
  'https://ilhkopeaibvltnrbdjnt.supabase.co/storage/v1/object/public/items-images/sechelinge.jpg?width=500&quality=75',
  'appliances',
  '2026-08-28'
),
(
  '{"fr": "Commode", "en": "Chest of Drawers", "es": "Cómoda"}',
  '{"fr": "Commode 3 tiroirs en bois blanc, très bon état.", "en": "3-drawer chest in white wood, very good condition.", "es": "Cómoda de 3 cajones en madera blanca, muy buen estado."}',
  45.00,
  'https://ilhkopeaibvltnrbdjnt.supabase.co/storage/v1/object/public/items-images/commode.jpg?width=500&quality=75',
  'furniture',
  '2026-08-28'
),
(
  '{"fr": "Coiffeuse", "en": "Dressing Table", "es": "Tocador"}',
  '{"fr": "Coiffeuse avec miroir et rangements intégrés.", "en": "Dressing table with mirror and built-in storage.", "es": "Tocador con espejo y almacenamiento integrado."}',
  60.00,
  'https://ilhkopeaibvltnrbdjnt.supabase.co/storage/v1/object/public/items-images/coiffeuse.jpg?width=500&quality=75',
  'furniture',
  '2026-08-28'
);
```
