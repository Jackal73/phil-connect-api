const express = require("express");
const router = express.Router();
const {
  insertTicket,
  // getTickets,
  getTickets1,
  // getTicketById,
  getTicketById1,
  updateClientReply,
  updateStatusClose,
  deleteTicket,
} = require("../model/ticket/ticket.model");
const { userAuthorization } = require("../middlewares/authorization.middleware");
const { TicketSchema } = require("../model/ticket/ticket.schema");

router.all("/", (req, res, next) => {
  next();
});

// - create new ticket
router.post("/", userAuthorization, async (req, res) => {
  try {
    const {
      dateOrdered,
      orderedBy,
      from,
      recipient,
      address,
      zipCode,
      fileNo,
      packageContents,
      status,
      created,
      receiver,
    } = req.body;
    const userId = req.userId;

    const ticketObj = {
      // clientId: userId,

      dateOrdered: new Date(dateOrdered),
      orderedBy,
      from,
      recipient,
      address,
      zipCode,
      fileNo,
      packageContents,
      status,
      created,
      receiver,
    };

    const result = await insertTicket(ticketObj);

    if (result._id) {
      return res.json({
        status: "success",
        message: "The new ticket has been created",
      });
    }
    res.json({
      status: "error",
      message: "Unable to create a ticket, please try again later",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// - get all tickets for a specific user
// router.get("/", userAuthorization, async (req, res) => {
//   try {
//     const userId = req.userId;
//     const result = await getTickets(userId);

//     return res.json({
//       status: "success",
//       result,
//     });
//   } catch (error) {
//     res.json({
//       status: "error",
//       message: error.message,
//     });
//   }
// });

// - get ALL tickets
router.all("/1", async (req, res) => {
  try {
    const result = await getTickets1();

    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// - get ticket by ticket _id (user)
// router.get("/:_id", userAuthorization, async (req, res) => {
//   try {
//     const { _id } = req.params;
//     const clientId = req.userId;
//     const result = await getTicketById(_id, clientId);

//     return res.json({
//       status: "success",
//       result,
//     });
//   } catch (error) {
//     res.json({
//       status: "error",
//       message: error.message,
//     });
//   }
// });

// Get any ticket by id

router.get("/1/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await getTicketById1(_id);

    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// - edit ticket form by ticket _id
router.put("/:_id", userAuthorization, async (req, res) => {
  try {
    const {
      dateOrdered,
      orderedBy,
      from,
      recipient,
      address,
      zipCode,
      fileNo,
      packageContents,
      status,
      created,
      receiver,
    } = req.body;
    const { _id } = req.params;
    const msgObj = {
      _id,
      dateOrdered: new Date(dateOrdered),
      orderedBy,
      from,
      recipient,
      address,
      zipCode,
      fileNo,
      packageContents,
      status,
      created,
      receiver,
    };
    const result = await updateClientReply(
      _id,
      dateOrdered,
      orderedBy,
      from,
      recipient,
      address,
      zipCode,
      fileNo,
      packageContents,
      status,
      created,
      receiver
    );

    if (result._id) {
      return res.json({
        status: "success",
        message: "statement updated",
      });
    }
    res.json({
      status: "error",
      message: "Unable to update your message please try again later",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// - update ticket status to closed
router.patch("/close-ticket/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await updateStatusClose({ _id });

    if (result._id) {
      return res.json({
        status: "success",
        message: "Connected!",
      });
    }
    res.json({
      status: "error",
      message: "Unable to get Connected",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// - delete a ticket
router.delete("/:_id", userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;
    const result = await deleteTicket({ _id, clientId });

    return res.json({
      status: "success",
      message: "This ticket has been deleted!",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/exportData", (req, res) => {
  var wb = XLSX.utils.book_new(); //new workbook
  TicketSchema.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
      var temp = JSON.stringify(data);
      temp = JSON.parse(temp);
      var ws = XLSX.utils.json_to_sheet(temp);
      var down = __dirname + "/public/exportdata.xlsx";
      XLSX.utils.book_append_sheet(wb, ws, "sheet1");
      XLSX.writeFile(wb, down);
      res.download(down);
    }
  });
});

module.exports = router;
