// models/MenuItem.js
import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  gradazione: String,
  colore: String,
  aroma: String,
  provenienza: String,
  tipologia: String,
  metodo: String,
  items: [
    {
      name: String,
      description: String,
      price: Number,
    },
  ],
});

const MenuItemSchema = new mongoose.Schema({
  time: { type: String, enum: ["giorno", "sera"], required: true },
  category: String,
  items: [ItemSchema],
});

export default mongoose.models.MenuItem ||
  mongoose.model("MenuItem", MenuItemSchema);
