const Joi = require("joi");

const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ["com", "net", "digital"] },
});

const pin = Joi.number().min(10000).max(999999).required();
const phone = Joi.number().min(1000000001).max(9000000001).required();
const newPassword = Joi.string().min(3).max(30).required();
const shortStr = Joi.string().min(1).max(50);
const shortStrZero = Joi.string().min(2).max(50);
const longStr = Joi.string().min(2).max(1000);
const dt = Joi.date();
const num = Joi.number().min(0).max(999999999999999).required();
const bool = Joi.boolean();
const num1 = Joi.number().min(0).max(999999999999999);

const resetPassReqValidation = (req, res, next) => {
  const schema = Joi.object({ email });
  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const updatePassValidation = (req, res, next) => {
  const schema = Joi.object({ email, pin, newPassword });
  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const createNewTicketValidation = (req, res, next) => {
  const schema = Joi.object({
    fileNo: shortStr.required(),
    closeDate: dt.required(),
    fundDate: dt.required(),
    dealType: shortStr.required(),
    closerOne: shortStr.required(),
    // selectedCloserOption: shortStr.required(),
    commishClOne: shortStr.required(),
    closerTwo: shortStr,
    commishClTwo: shortStr,
    mobCloser: shortStr,
    mobFee: shortStr,
    overage: num1.required(),
    processorOne: shortStr.required(),
    commishPrOne: shortStr.required(),
    processorTwo: shortStr,
    commishPrTwo: shortStr,
    clientRefOne: shortStr.required(),
    clientRefTwo: shortStr,
    realAgentOne: shortStr.required(),
    realAgentTwo: shortStr,
    lnOfficer: shortStr.required(),
    salesRepOne: shortStr.required(),
    salesTypeOne: shortStr,
    salesRepTwo: shortStr,
    salesTypeTwo: shortStr,
    discount: shortStr.required(),
    discountApproval: shortStr,
    freedomCheck: shortStr.required(),
    message: longStr,
  });

  const value = schema.validate(req.body);

  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const replyTicketMessageValidation = (req, res, next) => {
  const schema = Joi.object({
    fileNo: shortStr.required(),
    closeDate: dt,
    fundDate: dt,
    dealType: shortStr,
    closerOne: shortStr,
    commishClOne: shortStr,
    closerTwo: shortStr,
    commishClTwo: shortStr,
    mobCloser: shortStr,
    mobFee: shortStr,
    overage: shortStr,
    processorOne: shortStr,
    commishPrOne: shortStr,
    processorTwo: shortStr,
    commishPrTwo: shortStr,
    clientRefOne: shortStr,
    clientRefTwo: shortStr,
    realAgentOne: shortStr,
    realAgentTwo: shortStr,
    lnOfficer: shortStr,
    salesRepOne: shortStr,
    salesTypeOne: shortStr,
    salesRepTwo: shortStr,
    salesTypeTwo: shortStr,
    discount: shortStr,
    discountApproval: shortStr,
    freedomCheck: shortStr,
    message: longStr,
  });

  const value = schema.validate(req.body);

  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const newUserValidation = (req, res, next) => {
  const schema = Joi.object({
    name: shortStr.required(),
    company: shortStr.required(),
    address: shortStr.required(),
    phone: phone,
    email: email.required(),
    password: shortStr.required(),
  });

  const value = schema.validate(req.body);

  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

module.exports = {
  resetPassReqValidation,
  updatePassValidation,
  createNewTicketValidation,
  replyTicketMessageValidation,
  newUserValidation,
};
