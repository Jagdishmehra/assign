
const { sendEmail, sendSms } = require('../utils/notification');
const User = require('../models/User');


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { start, end, participants } = req.body;

  try {
    const updatedSession = await Session.findByIdAndUpdate(id, { start, end, participants }, { new: true });


    for (const participant of participants) {
      const user = await User.findOne({ email: participant.email });
      
      if (user) {
        const message = `Session updated. New time: ${new Date(start).toLocaleString()} - ${new Date(end).toLocaleString()}`;


        if (user.notificationPreferences.email) {
          await sendEmail(participant.email, 'Session Update Notification', message);
        }
        if (user.notificationPreferences.sms) {
          await sendSms(participant.phoneNumber, message);
        }
      }
    }

    res.status(200).json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: 'Error updating session', error });
  }
});
