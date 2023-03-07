const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectID,
    },

    dateOrdered: {
      // requested delivery date
      type: Date,
      maxlength: 50,
      required: true,
      default: "",
    },
    orderedBy: {
      type: String,
      maxlength: 50,
      required: true,
      default: "",
    },
    recipient: {
      type: String,
      maxlength: 50,
      required: true,
      default: "",
    },
    address: {
      type: String,
      maxlength: 200,
      required: true,
      default: "",
    },
    zipCode: {
      type: String,
      maxlength: 50,
      required: true,
      default: "",
    },
    fileNo: {
      type: String,
      maxlength: 50,
      required: true,
      default: "",
    },
    packageContents: {
      type: String,
      maxlength: 150,
      required: false,
      default: "",
    },
    status: {
      type: String,
      maxlength: 20,
      required: false,
      default: "",
    },
    created: {
      type: String,
      maxlength: 20,
      required: false,
      default: "",
    },
    receiver: {
      type: String,
      maxlength: 50,
      required: false,
      default: "",
    },
  },

  { timestamps: true }
);

module.exports = {
  TicketSchema: mongoose.model("Ticket", TicketSchema),
};
