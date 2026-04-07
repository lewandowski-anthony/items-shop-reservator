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
INSERT INTO items (title, description, price, image_url, is_reserved)
VALUES 
(
  '{"fr": "Appareil Photo Vintage", "en": "Vintage Camera", "es": "Cámara Vintage"}',
  '{"fr": "Un bel objet qui nous a suivi partout. Parfait état !", "en": "A beautiful item that followed us everywhere. Perfect condition!", "es": "Un objeto hermoso que nos siguió a todas partes. ¡Perfecto estado!"}',
  85.00,
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
  false
),
(
  '{"fr": "Vélo de ville", "en": "City Bike", "es": "Bicicleta de ciudad"}',
  '{"fr": "Idéal pour vos trajets quotidiens. Antivol inclus.", "en": "Ideal for your daily commutes. Lock included.", "es": "Ideal para tus trayectos diarios. Candado incluido."}',
  120.00,
  'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500',
  false
),
(
  '{"fr": "Plante Monstera", "en": "Monstera Plant", "es": "Planta Monstera"}',
  '{"fr": "Elle a besoin d''une nouvelle maison avant notre envol !", "en": "She needs a new home before we fly out!", "es": "¡Necesita un nuevo hogar antes de nuestro vuelo!"}',
  25.00,
  'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500',
  true
),
(
  '{"fr": "Lampe de bureau", "en": "Desk Lamp", "es": "Lámpara de escritorio"}',
  '{"fr": "Style industriel, ampoule fournie.", "en": "Industrial style, bulb included.", "es": "Estilo industrial, bombilla incluida."}',
  15.00,
  'https://images.unsplash.com/photo-1507473885765-e6ed657f99ad?w=500',
  false
);

INSERT INTO reservations (item_id, customer_name, customer_email, status)
SELECT id, 'Jean Dupont', 'jean.dupont@email.com', 'confirmed'
FROM items 
WHERE is_reserved = true 
LIMIT 1;
```
