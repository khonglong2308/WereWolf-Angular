import { Component, OnInit } from "@angular/core";
import { SocketioService } from "./../../services/socketIo/socket-io.service";
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: "app-chat-box",
  templateUrl: "./chat-box.component.html",
  styleUrls: ["./chat-box.component.scss"]
})

export class ChatBoxComponent implements OnInit {
  newMessage: "";
  name: string;
  messageLists = []
  messageListsRocover = []
  _RecoverMessagesFlag = false;
  _RecoverMessagesSubcription

  constructor(private SocketioService: SocketioService, private UsersService:UsersService) {
   }

  sendMessage() {
    if (this.newMessage != undefined) {
      console.log(this.newMessage + "does it run");
      this.SocketioService.sendData({
        name: this.UsersService.user.name,
        message: this.newMessage
      });
    } this.newMessage = undefined;
    console.log(this.UsersService.user.name+'name');
    
  }

  ngOnInit() {
    this.SocketioService.setUpRecover();

    this.SocketioService.getData().subscribe(data => {
      // if (this.messageListsRocover.length != 0) {
      //   this.SocketioService.recoverMess.unsubscribe()
      // }
      this.messageLists.push(data);
      console.log(this.messageLists);
    });

    this._RecoverMessagesSubcription=this.SocketioService.getDataFormRecoverofRoom().subscribe(data => {
      if (this._RecoverMessagesFlag && (this._RecoverMessagesFlag=true)) {
        this._RecoverMessagesSubcription.unsubscribe();
      }
      console.log("------")
      console.log(data)
      console.log("------")
      this.messageListsRocover = data
       this._RecoverMessagesFlag = true
    });
  }

  ngOnDestroy(): void {
    // this._RecoverMessagesSubcription.unsubscribe();

  }
}

