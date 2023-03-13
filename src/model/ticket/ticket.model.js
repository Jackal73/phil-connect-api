const { TicketSchema } = require("./ticket.schema");

const insertTicket = (ticketObj) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema(ticketObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
    console.log("score!!", ticketObj);
  });
};

//- get all tickets by client id
const getTickets = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({
        clientId,
      })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

//- get All tickets
const getTickets1 = () => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

//- get ticket by id
// const getTicketById = (_id, clientId) => {
//   return new Promise((resolve, reject) => {
//     try {
//       TicketSchema.find({ _id, clientId })
//         .then((data) => resolve(data))
//         .catch((error) => reject(error));
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// get Any ticket by id

const getTicketById1 = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ _id })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const updateClientReply = (
  _id,
  dateOrdered,
  orderedBy,
  officeFrom,
  recipient,
  address,
  zipCode,
  fileNo,
  packageContents,
  status,
  created,
  receiver
) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndUpdate(
        { _id },
        {
          $set: {
            dateOrdered,
            orderedBy,
            officeFrom,
            recipient,
            address,
            zipCode,
            fileNo,
            packageContents,
            status,
            created,
            receiver,
          },
        }
      )

        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const updateStatusClose = ({ _id }) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndUpdate(
        { _id },
        {
          status: "Connected",
        }
        // { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const deleteTicket = ({ _id, clientId }) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndDelete({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insertTicket,
  getTickets,
  getTickets1,
  // getTicketById,
  getTicketById1,
  updateClientReply,
  updateStatusClose,
  deleteTicket,
};
