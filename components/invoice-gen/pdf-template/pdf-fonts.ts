import { Font } from "@react-pdf/renderer";

let fontsRegistered = false;

export function registerFonts() {
  if (fontsRegistered) return;

  Font.register({
    family: "Inter",
    fonts: [
      { src: "/fonts/Inter/Inter_28pt-Regular.ttf", fontWeight: 400 },
      { src: "/fonts/Inter/Inter_28pt-Medium.ttf", fontWeight: 500 },
      { src: "/fonts/Inter/Inter_28pt-Bold.ttf", fontWeight: 700 },
    ],
  });

  Font.register({
    family: "Montserrat",
    fonts: [
      { src: "/fonts/Montserrat/Montserrat-Regular.ttf", fontWeight: 400 },
      { src: "/fonts/Montserrat/Montserrat-Medium.ttf", fontWeight: 500 },
      { src: "/fonts/Montserrat/Montserrat-Bold.ttf", fontWeight: 700 },
    ],
  });

  Font.register({
    family: "GoogleSans",
    fonts: [
      { src: "/fonts/GoogleSans/GoogleSans-Medium.ttf", fontWeight: 500 },
    ],
  });

  fontsRegistered = true;
}
