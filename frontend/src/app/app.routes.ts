import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { TourismComponent } from './pages/tourism/tourism.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Módulos Principales Solicitados
  { path: '', component: HomeComponent, title: 'ZeciaK Store | Inicio - Canoas de Punta Sal' },
  { path: 'inicio', redirectTo: '', pathMatch: 'full' },
  
  { path: 'catalog', component: CatalogComponent, title: 'ZeciaK Store | Catálogo Playero' },
  { path: 'catalogo', redirectTo: 'catalog', pathMatch: 'full' },

  { path: 'nosotros', component: NosotrosComponent, title: 'ZeciaK Store | Sobre Nosotros' },
  { path: 'about', redirectTo: 'nosotros', pathMatch: 'full' },

  { path: 'contacto', component: ContactoComponent, title: 'ZeciaK Store | Contacto 24/7' },
  { path: 'contact', redirectTo: 'contacto', pathMatch: 'full' },

  // Promoción Turística y Comercio Transaccional
  { path: 'tourism', component: TourismComponent, title: 'ZeciaK Store | Destinos & Turismo' },
  { path: 'turismo', redirectTo: 'tourism', pathMatch: 'full' },

  { path: 'cart', component: CartComponent, title: 'ZeciaK Store | Carrito de Compras' },
  
  // Seguridad & Autenticación JWT
  { path: 'login', component: LoginComponent, title: 'ZeciaK Store | Iniciar Sesión' },
  { path: 'register', component: RegisterComponent, title: 'ZeciaK Store | Registro' },

  { path: '**', redirectTo: '' }
];
