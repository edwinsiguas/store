-- ========================================================
-- ZeciaK Store - Initial Seed Data (PostgreSQL 15)
-- Contraseñas hasheadas con BCrypt (fuerza 10)
-- admin@zeciakstore.com -> admin123
-- cliente@zeciakstore.com -> cliente123
-- ========================================================

INSERT INTO users (name, email, password, role) VALUES
('Administrador ZeciaK', 'admin@zeciakstore.com', '$2a$10$w8Tlh9wzL/O4iK8/31lY/O25D4O3n4qK1pE/4.Lh4Vz1l4wZqB.Sy', 'ROLE_ADMIN'),
('Turista Punta Sal', 'cliente@zeciakstore.com', '$2a$10$8k9fJ0l4gH1wQ5u/7v.eA.5zY/4qN1tB3h0rE/5.Kh5Uz2m5xA.Tz', 'ROLE_CLIENT')
ON CONFLICT (email) DO NOTHING;

-- Catálogo ZeciaK Store - Categorías: Damas, Caballeros, Niños, Accesorios
INSERT INTO products (name, description, price, stock, image_url, category, is_featured, rating) VALUES
-- DAMAS
('Bikini Tropical Canoas de Punta Sal', 'Bikini exclusivo de 2 piezas elaborado con tela de secado rápido y protección UV 50+. Diseño floral inspirado en el atardecer norteño.', 129.90, 15, 'assets/images/Gemini_Generated_Image_ (12).png', 'Damas', TRUE, 4.9),
('Salida de Baño Crochet Artesanal', 'Prenda ligera tejida a mano por artesanas costeras de Tumbes. Elegancia y frescura para caminar por la orilla del mar.', 89.90, 8, 'assets/images/Gemini_Generated_Image_ (13).png', 'Damas', TRUE, 4.8),
('Vestido Playero Brisa de Punta Sal', 'Vestido vaporoso 100% lino y algodón suave. Ideal para veladas frente al mar, cenas en resorts y paseos al atardecer.', 145.00, 10, 'assets/images/Gemini_Generated_Image_ (16).png', 'Damas', FALSE, 4.7),
('Bañador Enterizo Océano Pacífico', 'Traje de baño de una sola pieza con soporte anatómico y corte estilizador. Resiste el cloro y el agua salina con máxima durabilidad.', 135.50, 12, 'assets/images/Gemini_Generated_Image_ (1).png', 'Damas', FALSE, 4.9),

-- CABALLEROS
('Short Bañador Surfista Punta Sal', 'Short playero técnico con cordón ajustable y bolsillo impermeable. Secado ultra veloz y tejido elástico 4-way stretch.', 79.90, 20, 'assets/images/Gemini_Generated_Image_d1bxoxd1bxoxd1bx.png', 'Caballeros', TRUE, 4.9),
('Camisa de Lino Palmeras & Sol', 'Camisa casual con botones de coco y corte suelto. Diseñada especialmente para el clima cálido constante de Canoas de Punta Sal.', 110.00, 14, 'assets/images/Gemini_Generated_Image_ (6).png', 'Caballeros', TRUE, 4.8),
('Polo Algodón Pima ZeciaK Edición Océano', 'Polo 100% Algodón Pima Peruano de máxima suavidad y frescura. Estampado serigráfico que rinde homenaje a las olas norteñas.', 65.00, 25, 'assets/images/Gemini_Generated_Image_ (7).png', 'Caballeros', FALSE, 4.6),
('Short Playero Ballena Jorobada', 'Bañador masculino con motivo ilustrado de las ballenas jorobadas de Canoas de Punta Sal. Forro interior de malla suave antirozaduras.', 85.00, 11, 'assets/images/Gemini_Generated_Image_ (9).png', 'Caballeros', FALSE, 4.7),

-- NIÑOS
('Conjunto Playero Protección UV 50+ Niños', 'Conjunto infantil de 2 piezas (polo manga larga y short) con máxima protección solar certificada para juegos seguros bajo el sol.', 75.00, 18, 'assets/images/Gemini_Generated_Image_nl1awdnl1awdnl1a.png', 'Niños', TRUE, 5.0),
('Ropa de Baño Sirenita de Punta Sal', 'Ropa de baño enteriza con volantes y colores vibrantes. Confeccionada con telas suaves que protegen la delicada piel infantil.', 69.90, 15, 'assets/images/Gemini_Generated_Image_nl1awdnl1awdnl1a (2).png', 'Niños', FALSE, 4.8),
('Poncho Toalla Infantil Cangrejito', 'Toalla tipo poncho 100% microfibra absorbente con capucha de personaje marino. Seca a los pequeños en segundos después de nadar.', 55.00, 22, 'assets/images/Gemini_Generated_Image_mfptvumfptvumfpt.png', 'Niños', FALSE, 4.9),

-- ACCESORIOS
('Lentes de Sol Polarizados Marina UV400', 'Gafas de sol polarizadas con marco flotante ultraligero y filtro UV400 categoría 3. Visión nítida eliminando los reflejos sobre el agua.', 49.90, 30, 'assets/images/Gemini_Generated_Image_ (12).png', 'Accesorios', TRUE, 4.8),
('Sombrero de Paja Toquilla Norteño', 'Sombrero clásico de ala ancha tejido por maestros artesanos. Bloquea el 98% de radiación solar y añade distinción a tu look playero.', 65.00, 16, 'assets/images/Gemini_Generated_Image_ (13).png', 'Accesorios', FALSE, 4.9),
('Bolso Playero Ecológico Yute ZeciaK', 'Espacioso bolso de playa confeccionado en fibras naturales de yute con forro interior impermeable y asas reforzadas.', 58.00, 28, 'assets/images/Gemini_Generated_Image_ (16).png', 'Accesorios', FALSE, 4.7),
('Tomatodo Térmico Acero Inoxidable 750ml', 'Botella térmica con aislamiento al vacío de doble pared. Conserva tus bebidas frías hasta por 24 horas bajo el calor costero.', 42.00, 35, 'assets/images/Gemini_Generated_Image_d1bxoxd1bxoxd1bx.png', 'Accesorios', FALSE, 4.9);

-- Promoción Turística Canoas de Punta Sal
INSERT INTO tourist_attractions (name, description, location, image_url) VALUES
('Balneario de Canoas de Punta Sal', 'Considerada una de las playas más hermosas de la costa peruana por sus aguas cálidas (24°C promedio), arenas doradas y oleaje suave ideal para el baño y descanso familiar.', 'Km 1187 Panamericana Norte, Canoas de Punta Sal, Tumbes', 'assets/images/Gemini_Generated_Image_ (12).png'),
('Avistamiento de Ballenas Jorobadas', 'Experiencia ecoturística inolvidable entre julio y octubre. Miles de ballenas jorobadas migran desde la Antártida hacia las aguas cálidas de Punta Sal para reproducirse.', 'Caleta de Canoas de Punta Sal', 'assets/images/Gemini_Generated_Image_d1bxoxd1bxoxd1bx.png'),
('Pozas Termales y Lodos de Hervideros', 'Aguas mineromedicinales de origen volcánico conocidas por sus propiedades exfoliantes y terapéuticas en la piel, a pocos minutos de Punta Sal.', 'Zona termal de Bocapán - Canoas', 'assets/images/Gemini_Generated_Image_ (13).png'),
('Gastronomía Marina Tumbesina', 'Degusta el inigualable ceviche de conchas negras, majarisco tumbesino y langostas frescas capturadas artesanalmente por pescadores de la caleta local.', 'Boulevard Gastronómico de Punta Sal', 'assets/images/Gemini_Generated_Image_ (16).png');
