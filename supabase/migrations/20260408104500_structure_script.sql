-- 1. Structure
CREATE TABLE IF NOT EXISTS public.categories (
    id text NOT NULL,
    name jsonb NOT NULL,
    icon text NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.items (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamptz NOT NULL DEFAULT now(),
    title jsonb NOT NULL,
    description jsonb NULL,
    price numeric NOT NULL DEFAULT 0,
    image_url text NULL DEFAULT 'https://placehold.co/600x400',
    date_of_availability date NULL,
    category text NULL,
    CONSTRAINT items_pkey PRIMARY KEY (id),
    CONSTRAINT fk_item_category FOREIGN KEY (category) REFERENCES categories (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS public.reservations (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamptz NOT NULL DEFAULT now(),
    item_id uuid NOT NULL,
    customer_name text NOT NULL,
    customer_email text NOT NULL,
    customer_phone text NULL,
    status text NULL DEFAULT 'pending',
    token uuid NULL DEFAULT gen_random_uuid(),
    CONSTRAINT reservations_pkey PRIMARY KEY (id),
    CONSTRAINT unique_item_reservation UNIQUE (item_id),
    CONSTRAINT reservations_item_id_fkey FOREIGN KEY (item_id) REFERENCES items (id) ON DELETE CASCADE
);

-- 2. Index
CREATE INDEX IF NOT EXISTS idx_reservations_item_id ON public.reservations (item_id);

-- 3. Trigger to send confirmation email after reservation is created
CREATE OR REPLACE TRIGGER send_confirm_email
AFTER INSERT ON reservations
FOR EACH ROW
EXECUTE FUNCTION supabase_functions.http_request (
  'https://ilhkopeaibvltnrbdjnt.supabase.co/functions/v1/confirm-reservation-email',
  'POST',
  '{"Content-type":"application/json","Authorization":"Bearer VOTRE_CLE_ICI"}',
  '{}',
  '5000'
);

-- 4. Insertion Catégories
INSERT INTO public.categories (id, name, icon)
VALUES
    ('appliances', '{"en":"Appliances","es":"Electrodomésticos","fr":"Électroménager","pt":"Eletrodomésticos"}', 'refrigerator'),
    ('decoration', '{"en":"Decoration","es":"Decoración","fr":"Décoration","pt":"Decoração"}', 'palette'),
    ('electronics', '{"en":"Electronics","es":"Electrónica","fr":"Électronique","pt":"Eletrónicos"}', 'tv'),
    ('furniture', '{"en":"Furniture","es":"Muebles","fr":"Meubles","pt":"Móveis"}', 'armchair'),
    ('garden', '{"en":"Garden","es":"Jardín","fr":"Jardin","pt":"Jardim"}');

-- 5. Insertion Items (avec corrections des apostrophes)
INSERT INTO public.items (id, created_at, title, description, price, image_url, date_of_availability, category)
VALUES
('16c595a3-bd69-4a6c-a80c-f5b41a423a2c', now(), '{"en":"Senseo coffee maker","es":"Cafetera Senseo","fr":"Cafetière Senseo","pt":"Cafeteira Senseo"}', '{"en":"Pod coffee machine, simple and efficient.","es":"Cafetera de monodosis, sencilla y eficaz.","fr":"Machine à café à dosettes, simple et efficace.","pt":"Máquina de café de cápsulas, simples e eficiente."}', 30.00, 'https://ilhkopeaibvltnrbdjnt.supabase.co/storage/v1/render/image/public/items-images/senseo.jpg?width=600&resize=contain&quality=75', '2026-12-20', 'appliances'),

('18f06c88-84be-4118-84be-f8908afa0921', now(), '{"en":"Washing Machine","es":"Lavadora","fr":"Machine à laver","pt":"Máquina de lavar roupa"}', '{"en":"Our washing machine, 4 years old, perfectly functional.","es":"Nuestra lavadora de 4 años, perfectamente funcional.","fr":"Notre machine à laver qui a 4 ans, parfaitement fonctionnelle.","pt":"A nossa máquina de lavar roupa com 4 anos, perfeitamente funcional."}', 85.00, 'https://ilhkopeaibvltnrbdjnt.supabase.co/storage/v1/object/public/items-images/washingmachine.jpg?width=500&quality=75', '2026-08-28', 'appliances'),

('501cb9c9-05c3-42b5-bed5-d53ee67faa64', now(), '{"en":"12-compartment bookshelf","es":"Estantería de 12 compartimentos","fr":"Bibliothèque à 12 cases","pt":"Estante de 12 compartimentos"}', '{"en":"Cube bookshelf practical for storage.","es":"Estantería de cubos práctica para el almacenamiento.","fr":"Bibliothèque cube pratique pour le rangement.","pt":"Estante em cubo prática para arrumação."}', 40.00, 'https://ilhkopeaibvltnrbdjnt.supabase.co/storage/v1/render/image/public/items-images/cube_library.jpg?width=600&resize=contain&quality=75', '2026-12-15', 'furniture'),

('753dbc7b-b901-4a97-884f-c8434dbf12e1', now(), '{"en":"Chest of Drawers","es":"Cómoda","fr":"Commode","pt":"Cómoda"}', '{"en":"3-drawer chest in white wood, very good condition.","es":"Cómoda de 3 cajones en madera blanca, muy buen estado.","fr":"Commode 3 tiroirs en bois blanc, très bon état.","pt":"Cómoda de 3 gavetas em madeira branca, muito bom estado."}', 45.00, 'https://ilhkopeaibvltnrbdjnt.supabase.co/storage/v1/object/public/items-images/commode.jpg?width=500&quality=75', '2026-08-28', 'furniture'),

('8f73f0b8-86c8-49b7-9ab7-7503817d3576', now(), '{"en":"Dressing Table","es":"Tocador","fr":"Coiffeuse","pt":"Penteadeira"}', '{"en":"Dressing table with mirror and built-in storage.","es":"Tocador con espejo y almacenamiento integrado.","fr":"Coiffeuse avec miroir et rangements intégrés.","pt":"Penteadeira com espelho e arrumação integrada."}', 60.00, 'https://ilhkopeaibvltnrbdjnt.supabase.co/storage/v1/object/public/items-images/coiffeuse.jpg?width=500&quality=75', '2026-08-28', 'furniture'),

('a645d017-1f2a-4a68-9ee9-7824dbf7f7d2', now(), '{"en":"Clothes Dryer","es":"Secadora","fr":"Sèche-linge","pt":"Máquina de secar roupa"}', '{"en":"Powerful dryer, ideal for winter.","es":"Secadora potente, ideal para el invierno.","fr":"Sèche-linge performant, idéal pour l''hiver.","pt":"Máquina de secar potente, ideal para o inverno."}', 120.00, 'https://ilhkopeaibvltnrbdjnt.supabase.co/storage/v1/object/public/items-images/sechelinge.jpg?width=500&quality=75', '2026-08-28', 'appliances'),

('c90ffbf2-929c-4d8f-85db-dae43815bd99', now(), '{"en":"Men''s wardrobe","es":"Armario para hombre","fr":"Penderie homme","pt":"Guarda-roupa masculino"}', '{"en":"Spacious wardrobe for clothes and accessories.","es":"Armario espacioso para ropa y accesorios.","fr":"Penderie spacieuse pour vêtements et accessoires.","pt":"Guarda-roupa espaçoso para roupas e acessórios."}', 50.00, 'https://ilhkopeaibvltnrbdjnt.supabase.co/storage/v1/render/image/public/items-images/wardrobe.jpg?width=600&resize=contain&quality=75', '2026-12-15', 'furniture'),

('d460a95c-2b07-4ac1-984c-eea39283553b', now(), '{"en":"Large IKEA bookshelf","es":"Estantería grande de IKEA","fr":"Grande bibliothèque IKEA","pt":"Estante grande do IKEA"}', '{"en":"Large sturdy bookshelf, ideal for books.","es":"Estantería grande y robusta, ideal para libros.","fr":"Grande bibliothèque robuste, idéale pour les livres.","pt":"Estante grande e robusta, ideal para livros."}', 60.00, 'https://ilhkopeaibvltnrbdjnt.supabase.co/storage/v1/render/image/public/items-images/library.jpg?width=600&resize=contain&quality=75', '2026-12-15', 'furniture'),

('d715655f-c5d4-498d-bc17-04bdcfd66d5f', now(), '{"en":"Nintendo Switch (1st gen)","es":"Nintendo Switch (1ª gen)","fr":"Nintendo Switch","pt":"Nintendo Switch (1ª ger.)"}', '{"en":"First generation Nintendo Switch console, good condition.","es":"Consola Nintendo Switch de primera generación, buen estado.","fr":"Console Nintendo Switch de première génération, bon état.","pt":"Consola Nintendo Switch de primeira geração, em bom estado."}', 150.00, 'https://ilhkopeaibvltnrbdjnt.supabase.co/storage/v1/render/image/public/items-images/switch.jpg?width=600&resize=contain&quality=75', '2026-12-20', 'electronics');
