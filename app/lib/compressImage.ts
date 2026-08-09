/**
 * Comprime imágenes en el navegador usando HTML5 Canvas API.
 * Convierte cualquier imagen (PNG, JPG, HEIC, etc.) a formato .webp ultra ligero.
 * 
 * @param file Archivo de imagen original seleccionado por el usuario
 * @param maxWidth Ancho máximo (por defecto 800px)
 * @param maxHeight Alto máximo (por defecto 800px)
 * @param quality Calidad de compresión (0.1 a 1.0, por defecto 0.75)
 */
export async function compressImage(
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 800,
  quality: number = 0.75
): Promise<{ compressedFile: File; originalSizeKb: number; compressedSizeKb: number }> {
  const originalSizeKb = Math.round(file.size / 1024);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Mantener proporción de aspecto escalando a maxWidth/maxHeight
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ compressedFile: file, originalSizeKb, compressedSizeKb: originalSizeKb });
          return;
        }

        // Renderizado suavizado en canvas
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Exportar a WebP súper comprimido
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve({ compressedFile: file, originalSizeKb, compressedSizeKb: originalSizeKb });
              return;
            }

            const cleanName = file.name.substring(0, file.name.lastIndexOf('.')) || 'producto';
            const webpFileName = `${cleanName}.webp`;

            const compressedFile = new File([blob], webpFileName, {
              type: 'image/webp',
              lastModified: Date.now(),
            });

            const compressedSizeKb = Math.round(compressedFile.size / 1024);

            resolve({
              compressedFile,
              originalSizeKb,
              compressedSizeKb
            });
          },
          'image/webp',
          quality
        );
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
  });
}
