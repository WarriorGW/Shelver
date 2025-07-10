import { ScrollArea } from "@/components/ui/scroll-area";

function Terms({ mode }: { mode: 1 | 2 }) {
  return (
    <ScrollArea className="h-72">
      {mode === 1 ? (
        <>
          <section>
            <h2 className="font-semibold text-base mb-1">
              Información general
            </h2>
            <p>
              <strong>Responsable:</strong> Fernando
            </p>
            <p>
              <strong>Domicilio:</strong> Aguascalientes, Aguascalientes, México
            </p>
            <p>
              <strong>Correo de contacto:</strong>{" "}
              <a
                href="mailto:221031@utags.edu.mx"
                className="underline text-blue-500"
              >
                221031@utags.edu.mx
              </a>
            </p>
            <p>
              <strong>Sitio web:</strong>{" "}
              <a
                href="https://shelver.vercel.app"
                target="_blank"
                className="underline text-blue-500"
              >
                shelver.vercel.app
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base">1. Objeto</h2>
            <p>
              Shelver ofrece un servicio de renta y venta de libros a través de
              su plataforma en línea. Estos términos regulan el uso del sitio y
              los servicios relacionados.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base">
              2. Aceptación de términos
            </h2>
            <p>
              Al usar el sitio web, el usuario acepta cumplir estos términos y
              las políticas aplicables.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base">
              3. Registro y uso del servicio
            </h2>
            <p>
              El usuario debe proporcionar información verídica para el
              registro. El servicio es para uso personal, prohibiéndose la
              reventa o uso comercial sin autorización.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base">4. Pago y reembolsos</h2>
            <p>
              Los pagos deben realizarse según los métodos disponibles.
              Reembolsos solo si el libro está en perfectas condiciones tras
              revisión.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base">
              5. Propiedad intelectual
            </h2>
            <p>
              Todo contenido del sitio es propiedad de Shelver o terceros
              autorizados. Está prohibida su reproducción sin permiso.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base">
              6. Limitación de responsabilidad
            </h2>
            <p>
              Shelver no se hace responsable por daños derivados del uso o
              imposibilidad de uso del servicio.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base">7. Modificaciones</h2>
            <p>
              Shelver puede modificar estos términos en cualquier momento,
              notificándolo en el sitio web.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base">
              8. Ley aplicable y jurisdicción
            </h2>
            <p>
              Regido por la <em>Ley Federal de Protección al Consumidor</em> y
              el <em>Código Civil Federal</em>. Jurisdicción: tribunales de
              Aguascalientes, México.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base">9. Contacto</h2>
            <p>
              Para dudas o reclamaciones, escribe a:{" "}
              <a
                href="mailto:221031@utags.edu.mx"
                className="underline text-blue-500"
              >
                221031@utags.edu.mx
              </a>
            </p>
          </section>
        </>
      ) : (
        <>
          <section>
            <h2 className="font-semibold text-base mb-1">Responsable</h2>
            <p>Fernando</p>
            <p>
              <strong>Correo:</strong>{" "}
              <a
                href="mailto:221031@utags.edu.mx"
                className="underline text-blue-500"
              >
                221031@utags.edu.mx
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base">
              1. Datos personales que se recaban
            </h2>
            <ul className="list-disc list-inside">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Datos bancarios</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-base">
              2. Finalidades del tratamiento
            </h2>
            <ul className="list-disc list-inside">
              <li>Identificar y autenticar al usuario</li>
              <li>Procesar pagos y operaciones</li>
              <li>Brindar soporte</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-base">
              3. Medios de recolección
            </h2>
            <p>Formularios en el sitio web y cookies para inicio de sesión.</p>
          </section>

          <section>
            <h2 className="font-semibold text-base">
              4. Transferencia de datos
            </h2>
            <p>
              Los datos se comparten solo con <strong>neon.tech</strong>,
              proveedor de base de datos.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base">
              5. Protección y seguridad
            </h2>
            <p>
              Los datos están encriptados y protegidos por medidas técnicas y
              administrativas.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base">6. Derechos ARCO</h2>
            <p>
              El usuario puede ejercer sus derechos de acceso, rectificación y
              cancelación enviando solicitud a{" "}
              <a
                href="mailto:221031@utags.edu.mx"
                className="underline text-blue-500"
              >
                221031@utags.edu.mx
              </a>
              , conforme a la{" "}
              <em>
                Ley Federal de Protección de Datos Personales en Posesión de los
                Particulares
              </em>
              .
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base">
              7. Conservación de datos
            </h2>
            <p>
              Los datos se almacenan por 3 años desde la última interacción.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base">8. Cambios al aviso</h2>
            <p>
              Shelver puede actualizar este aviso para cumplir con cambios
              legales o de servicio.
            </p>
          </section>
        </>
      )}
    </ScrollArea>
  );
}

export default Terms;
