﻿function Event_OnLogWarning(Sender, LogParams) {
   var locked = aqString.Find(LogParams.Str, "disabled");
   if (locked != -1)  {
// If found, block the message
    LogParams.Locked =true;
  }
   else {
// Else, post the message

    LogParams.Locked =false;
    }
}