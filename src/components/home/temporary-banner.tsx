import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function TemporaryBanner() {
  return (
    <Alert className="bg-secondary/20 border-secondary/30 rounded-none">
      <AlertCircle className="h-4 w-4 text-secondary" />
      <AlertTitle className="font-poppins text-secondary font-semibold">
        🐾 ¡Estamos preparando algo genial para ti y tu mascota!
      </AlertTitle>
      <AlertDescription className="font-montserrat text-foreground/80">
        Muy pronto podrás disfrutar de nuestra tienda en línea llena de amor, estilo y diversión para peluditos.
      </AlertDescription>
    </Alert>
  );
}