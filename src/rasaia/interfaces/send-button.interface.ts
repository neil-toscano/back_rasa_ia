interface ButtonReply {
  id: string;
  title: string;
}

export interface Button {
  type: 'reply';
  reply: ButtonReply; // Propiedades del botón de respuesta
}

// export interface Buttons {
//   buttons: Button[];
// }
