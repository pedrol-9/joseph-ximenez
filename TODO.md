# TODO: Registro de Componentes y Secciones Desactivadas o Eliminadas

Este archivo sirve para llevar el control de los componentes y las secciones que han sido ocultados de la interfaz de usuario (UI) o removidos del repositorio, para facilitar la toma de decisiones finales del equipo.

---

## 📋 Componentes Conservados (Ocultos de la UI)

Estos componentes han sido comentados en sus respectivas vistas para que no se muestren al usuario, pero sus archivos de código fuente siguen estando disponibles en el proyecto:

### 1. Carrusel de Tarjetas (`CardCarousel`)
* **Estado:** Desactivado (Oculto de la UI)
* **Archivo del Componente:** [CardCarousel.tsx](file:///c:/Users/USUARIO/OneDrive/Desktop/joseph-ximenez/src/app/galeria/components/CardCarousel.tsx)
* **Dónde se renderizaba:** [src/app/galeria/page.tsx](file:///c:/Users/USUARIO/OneDrive/Desktop/joseph-ximenez/src/app/galeria/page.tsx)
* **Acciones pendientes:**
  - [ ] Decidir si se reactivará en el futuro o si se eliminará permanentemente del proyecto.

### 2. Galería de Artistas (`ArtistGallery`)
* **Estado:** Desactivado (Oculto de la UI)
* **Archivo del Componente:** [ArtistGallery.tsx](file:///c:/Users/USUARIO/OneDrive/Desktop/joseph-ximenez/src/app/galeria/components/ArtistGallery.tsx)
* **Dónde se renderizaba:** [src/app/galeria/page.tsx](file:///c:/Users/USUARIO/OneDrive/Desktop/joseph-ximenez/src/app/galeria/page.tsx)
* **Acciones pendientes:**
  - [ ] Decidir si se reactivará en el futuro o si se eliminará permanentemente del proyecto.

### 3. Mapa Interactivo (`InteractiveMap`)
* **Estado:** Desactivado (Oculto de la UI)
* **Archivo del Componente:** [InteractiveMap.tsx](file:///c:/Users/USUARIO/OneDrive/Desktop/joseph-ximenez/src/app/(home)/components/InteractiveMap.tsx) y [MapComponent.tsx](file:///c:/Users/USUARIO/OneDrive/Desktop/joseph-ximenez/src/app/(home)/components/MapComponent.tsx)
* **Dónde se renderizaba:** [src/app/(home)/page.tsx](file:///c:/Users/USUARIO/OneDrive/Desktop/joseph-ximenez/src/app/(home)/page.tsx)
* **Detalles:** Depende de Leaflet y presentaba problemas de visualización en la UI/hidratación de Next.js.
* **Acciones pendientes:**
  - [ ] Decidir si se corregirán los problemas de renderizado de Leaflet en Next.js.
  - [ ] En caso de eliminación definitiva, remover las dependencias de `package.json` (`leaflet`, `react-leaflet`, `@types/leaflet`).

---

## 🗑️ Componentes y Secciones Eliminados del Todo

Los siguientes elementos han sido removidos por completo tanto de la interfaz como del repositorio para mantener limpia la base de código:

### 1. El Libro Místico (`MysticBook`)
* **Estado:** **Eliminado permanentemente**
* **Archivo del Componente:** `src/app/galeria/components/MysticBook.tsx` (Eliminado del sistema de archivos)
* **Detalles:** Se removieron todas sus referencias en [src/app/galeria/page.tsx](file:///c:/Users/USUARIO/OneDrive/Desktop/joseph-ximenez/src/app/galeria/page.tsx), los enlaces rotos en [src/layout/Footer.tsx](file:///c:/Users/USUARIO/OneDrive/Desktop/joseph-ximenez/src/layout/Footer.tsx) y sus estilos específicos/keyframes de transición en [src/app/globals.css](file:///c:/Users/USUARIO/OneDrive/Desktop/joseph-ximenez/src/app/globals.css).

### 2. Sección del Libro de MercadoLibre
* **Estado:** **Restaurado / Activo**
* **Ubicación:** [src/app/(home)/components/Legado.tsx](file:///c:/Users/USUARIO/OneDrive/Desktop/joseph-ximenez/src/app/(home)/components/Legado.tsx)
* **Detalles:** Se restauró el bloque completo con la imagen de portada y link a MercadoLibre en la sección de Legado y se volvió a agregar el enlace directo en el pie de página de la web ([src/layout/Footer.tsx](file:///c:/Users/USUARIO/OneDrive/Desktop/joseph-ximenez/src/layout/Footer.tsx)).

---

## 🔍 Instrucciones de Gestión

* **Para Reactivar un componente conservado:** Descomentar su importación y uso en su respectiva página contenedora.
* **Para Eliminar un componente conservado:** Borrar el archivo de la carpeta de componentes, limpiar importaciones y dependencias que queden huérfanas en `package.json`.
