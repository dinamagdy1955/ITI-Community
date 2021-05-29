import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { ChatsService } from '../Service/chats.service';

@Component({
  selector: 'app-all-messages',
  templateUrl: './all-messages.component.html',
  styleUrls: ['./all-messages.component.scss']
})
export class AllMessagesComponent implements OnInit, OnDestroy {

  chatRoom: string
  data: Observable<any>;

  userID
  loggedUser
  chatList = []
  users = []
  active;

  allMsgs = [];

  userRoom;

  msgGroup: FormGroup;

  searchKeyWord;

  private subscription: Subscription[] = [];
  constructor(private chat: ChatsService, private route: ActivatedRoute, private router: Router, private us: UserService, private fb: FormBuilder) {
    this.data = this.us.localUserData.asObservable();
    let sub = this.data.subscribe((res) => {
      if (res != null) {
        this.userID = res.id;
        this.loggedUser = res;
      }
    });
    this.subscription.push(sub);

    this.msgGroup = this.fb.group({
      sendBy: this.userID,
      Body: ''
    })


  }
  ngOnDestroy(): void {
    for (var i of this.subscription) {
      i.unsubscribe()
    }
  }

  ngOnInit(): void {
    let param = this.route.paramMap.subscribe(res => {
      this.chatRoom = res.get('id')
      this.getMassege(this.chatRoom)
      this.active = this.chatRoom
    })

    let sub1 = this.chat.getChats().subscribe(res => {
      this.chatList = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        }
      })

      this.users = [];
      this.chatList.filter(checkid => {
        if (checkid.User1.id == this.userID || checkid.User2.id == this.userID) {
          if (checkid.User1.id == this.userID && !checkid.User1.isDeleted) {
            if (checkid.id == this.chatRoom) {
              this.userRoom = {
                id: checkid.id,
                user: checkid.User2
              }
            }
            this.users.push({
              id: checkid.id,
              user: checkid.User2
            })
          } else if (checkid.User2.id == this.userID && !checkid.User2.isDeleted) {
            if (checkid.id == this.chatRoom) {
              this.userRoom = {
                id: checkid.id,
                user: checkid.User1
              }
            }
            this.users.push({
              id: checkid.id,
              user: checkid.User1
            })
          }
        }

      })

    })
    this.subscription.push(sub1)
    this.msgGroup = this.fb.group({
      sendBy: this.userID,
      Body: ''
    })
  }

  getMassege(id) {
    this.userRoom = this.users.find(e => {
      if (e.id == id) {
        return e.user
      }
    })
    this.chat.getMasseges(id).subscribe((res) => {
      this.allMsgs = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        }
      })
    })
  }

  sendMsg() {
    this.chat.sendMsg(this.chatRoom, this.msgGroup.value.sendBy, this.msgGroup.value.Body)
    this.msgGroup = this.fb.group({
      sendBy: this.userID,
      Body: ''
    })
  }

  deleteRoom(id) {
    this.userRoom = ''
    this.chat.deleteRoom(id, this.userID)
  }


}
