package com.zeciakstore.backend.config;

import com.zeciakstore.backend.model.Product;
import com.zeciakstore.backend.model.Role;
import com.zeciakstore.backend.model.TouristAttraction;
import com.zeciakstore.backend.model.User;
import com.zeciakstore.backend.repository.ProductRepository;
import com.zeciakstore.backend.repository.TouristAttractionRepository;
import com.zeciakstore.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

/**
 * Inicializador de datos para ZeciaK Store.
 * Carga usuarios de prueba, catálogo inicial por categorías (Damas, Caballeros, Niños, Accesorios)
 * y atractivos turísticos representativos de Canoas de Punta Sal.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private TouristAttractionRepository attractionRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedUsers();
        seedProducts();
        seedAttractions();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setName("Administrador ZeciaK");
            admin.setEmail("admin@zeciakstore.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ROLE_ADMIN);

            User client = new User();
            client.setName("Turista Punta Sal");
            client.setEmail("cliente@zeciakstore.com");
            client.setPassword(passwordEncoder.encode("cliente123"));
            client.setRole(Role.ROLE_CLIENT);

            userRepository.saveAll(Arrays.asList(admin, client));
            System.out.println(">>> [ZeciaK Store] Usuarios iniciales sembrados con éxito.");
        }
    }

    private void seedProducts() {
        if (productRepository.count() == 0) {
            List<Product> initialProducts = Arrays.asList(
                    // CATEGORÍA: DAMAS
                    Product.builder()
                            .name("Bikini Tropical Canoas de Punta Sal")
                            .description("Bikini exclusivo de 2 piezas elaborado con tela de secado rápido y protección UV 50+. Diseño floral inspirado en el atardecer norteño.")
                            .price(new BigDecimal("129.90"))
                            .stock(15)
                            .category("Damas")
                            .imageUrl("assets/images/Gemini_Generated_Image_ (12).png")
                            .featured(true)
                            .rating(4.9)
                            .build(),

                    Product.builder()
                            .name("Salida de Baño Crochet Artesanal")
                            .description("Prenda ligera tejida a mano por artesanas costeras de Tumbes. Elegancia y frescura para caminar por la orilla del mar.")
                            .price(new BigDecimal("89.90"))
                            .stock(8)
                            .category("Damas")
                            .imageUrl("assets/images/Gemini_Generated_Image_ (13).png")
                            .featured(true)
                            .rating(4.8)
                            .build(),

                    Product.builder()
                            .name("Vestido Playero Brisa de Punta Sal")
                            .description("Vestido vaporoso 100% lino y algodón suave. Ideal para veladas frente al mar, cenas en resorts y paseos al atardecer.")
                            .price(new BigDecimal("145.00"))
                            .stock(10)
                            .category("Damas")
                            .imageUrl("assets/images/Gemini_Generated_Image_ (16).png")
                            .featured(false)
                            .rating(4.7)
                            .build(),

                    Product.builder()
                            .name("Bañador Enterizo Océano Pacífico")
                            .description("Traje de baño de una sola pieza con soporte anatómico y corte estilizador. Resiste el cloro y el agua salina con máxima durabilidad.")
                            .price(new BigDecimal("135.50"))
                            .stock(12)
                            .category("Damas")
                            .imageUrl("assets/images/Gemini_Generated_Image_ (1).png")
                            .featured(false)
                            .rating(4.9)
                            .build(),

                    // CATEGORÍA: CABALLEROS
                    Product.builder()
                            .name("Short Bañador Surfista Punta Sal")
                            .description("Short playero técnico con cordón ajustable y bolsillo impermeable. Secado ultra veloz y tejido elástico 4-way stretch.")
                            .price(new BigDecimal("79.90"))
                            .stock(20)
                            .category("Caballeros")
                            .imageUrl("assets/images/Gemini_Generated_Image_d1bxoxd1bxoxd1bx.png")
                            .featured(true)
                            .rating(4.9)
                            .build(),

                    Product.builder()
                            .name("Camisa de Lino Palmeras & Sol")
                            .description("Camisa casual con botones de coco y corte suelto. Diseñada especialmente para el clima cálido constante de Canoas de Punta Sal.")
                            .price(new BigDecimal("110.00"))
                            .stock(14)
                            .category("Caballeros")
                            .imageUrl("assets/images/Gemini_Generated_Image_ (6).png")
                            .featured(true)
                            .rating(4.8)
                            .build(),

                    Product.builder()
                            .name("Polo Algodón Pima ZeciaK Edición Océano")
                            .description("Polo 100% Algodón Pima Peruano de máxima suavidad y frescura. Estampado serigráfico que rinde homenaje a las olas norteñas.")
                            .price(new BigDecimal("65.00"))
                            .stock(25)
                            .category("Caballeros")
                            .imageUrl("assets/images/Gemini_Generated_Image_ (7).png")
                            .featured(false)
                            .rating(4.6)
                            .build(),

                    Product.builder()
                            .name("Short Playero Ballena Jorobada")
                            .description("Bañador masculino con motivo ilustrado de las ballenas jorobadas de Canoas de Punta Sal. Forro interior de malla suave antirozaduras.")
                            .price(new BigDecimal("85.00"))
                            .stock(11)
                            .category("Caballeros")
                            .imageUrl("assets/images/Gemini_Generated_Image_ (9).png")
                            .featured(false)
                            .rating(4.7)
                            .build(),

                    // CATEGORÍA: NIÑOS
                    Product.builder()
                            .name("Conjunto Playero Protección UV 50+ Niños")
                            .description("Conjunto infantil de 2 piezas (polo manga larga y short) con máxima protección solar certificada para juegos seguros bajo el sol.")
                            .price(new BigDecimal("75.00"))
                            .stock(18)
                            .category("Niños")
                            .imageUrl("assets/images/Gemini_Generated_Image_nl1awdnl1awdnl1a.png")
                            .featured(true)
                            .rating(5.0)
                            .build(),

                    Product.builder()
                            .name("Ropa de Baño Sirenita de Punta Sal")
                            .description("Ropa de baño enteriza con volantes y colores vibrantes. Confeccionada con telas suaves que protegen la delicada piel infantil.")
                            .price(new BigDecimal("69.90"))
                            .stock(15)
                            .category("Niños")
                            .imageUrl("assets/images/Gemini_Generated_Image_nl1awdnl1awdnl1a (2).png")
                            .featured(false)
                            .rating(4.8)
                            .build(),

                    Product.builder()
                            .name("Poncho Toalla Infantil Cangrejito")
                            .description("Toalla tipo poncho 100% microfibra absorbente con capucha de personaje marino. Seca a los pequeños en segundos después de nadar.")
                            .price(new BigDecimal("55.00"))
                            .stock(22)
                            .category("Niños")
                            .imageUrl("assets/images/Gemini_Generated_Image_mfptvumfptvumfpt.png")
                            .featured(false)
                            .rating(4.9)
                            .build(),

                    // CATEGORÍA: ACCESORIOS
                    Product.builder()
                            .name("Lentes de Sol Polarizados Marina UV400")
                            .description("Gafas de sol polarizadas con marco flotante ultraligero y filtro UV400 categoría 3. Visión nítida eliminando los reflejos sobre el agua.")
                            .price(new BigDecimal("49.90"))
                            .stock(30)
                            .category("Accesorios")
                            .imageUrl("assets/images/Gemini_Generated_Image_ (12).png")
                            .featured(true)
                            .rating(4.8)
                            .build(),

                    Product.builder()
                            .name("Sombrero de Paja Toquilla Norteño")
                            .description("Sombrero clásico de ala ancha tejido por maestros artesanos. Bloquea el 98% de radiación solar y añade distinción a tu look playero.")
                            .price(new BigDecimal("65.00"))
                            .stock(16)
                            .category("Accesorios")
                            .imageUrl("assets/images/Gemini_Generated_Image_ (13).png")
                            .featured(false)
                            .rating(4.9)
                            .build(),

                    Product.builder()
                            .name("Bolso Playero Ecológico Yute ZeciaK")
                            .description("Espacioso bolso de playa confeccionado en fibras naturales de yute con forro interior impermeable y asas reforzadas.")
                            .price(new BigDecimal("58.00"))
                            .stock(28)
                            .category("Accesorios")
                            .imageUrl("assets/images/Gemini_Generated_Image_ (16).png")
                            .featured(false)
                            .rating(4.7)
                            .build(),

                    Product.builder()
                            .name("Tomatodo Térmico Acero Inoxidable 750ml")
                            .description("Botella térmica con aislamiento al vacío de doble pared. Conserva tus bebidas frías hasta por 24 horas bajo el calor costero.")
                            .price(new BigDecimal("42.00"))
                            .stock(35)
                            .category("Accesorios")
                            .imageUrl("assets/images/Gemini_Generated_Image_d1bxoxd1bxoxd1bx.png")
                            .featured(false)
                            .rating(4.9)
                            .build()
            );

            productRepository.saveAll(initialProducts);
            System.out.println(">>> [ZeciaK Store] 15 Productos de catálogo sembrados con éxito.");
        }
    }

    private void seedAttractions() {
        if (attractionRepository.count() == 0) {
            List<TouristAttraction> attractions = Arrays.asList(
                    new TouristAttraction(null, "Balneario de Canoas de Punta Sal",
                            "Considerada una de las playas más hermosas de la costa peruana por sus aguas cálidas (24°C promedio), arenas doradas y oleaje suave ideal para el baño y descanso familiar.",
                            "Km 1187 Panamericana Norte, Canoas de Punta Sal, Tumbes",
                            "assets/images/Gemini_Generated_Image_ (12).png"),

                    new TouristAttraction(null, "Avistamiento de Ballenas Jorobadas",
                            "Experiencia ecoturística inolvidable entre julio y octubre. Miles de ballenas jorobadas migran desde la Antártida hacia las aguas cálidas de Punta Sal para reproducirse.",
                            "Caleta de Canoas de Punta Sal",
                            "assets/images/Gemini_Generated_Image_d1bxoxd1bxoxd1bx.png"),

                    new TouristAttraction(null, "Pozas Termales y Lodos de Hervideros",
                            "Aguas mineromedicinales de origen volcánico conocidas por sus propiedades exfoliantes y terapéuticas en la piel, a pocos minutos de Punta Sal.",
                            "Zona termal de Bocapán - Canoas",
                            "assets/images/Gemini_Generated_Image_ (13).png"),

                    new TouristAttraction(null, "Gastronomía Marina Tumbesina",
                            "Degusta el inigualable ceviche de conchas negras, majarisco tumbesino y langostas frescas capturadas artesanalmente por pescadores de la caleta local.",
                            "Boulevard Gastronómico de Punta Sal",
                            "assets/images/Gemini_Generated_Image_ (16).png")
            );

            attractionRepository.saveAll(attractions);
            System.out.println(">>> [ZeciaK Store] Atractivos turísticos sembrados con éxito.");
        }
    }
}
