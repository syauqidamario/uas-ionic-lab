import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
// @ts-ignore
import {FriendModel} from './friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private dbPath = '/friends';
  friendRef: AngularFireList<FriendModel> = null;
  tmpFriend: any;
  tmp: any;

  constructor(
      private db: AngularFireDatabase
  ) {
    this.friendRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<FriendModel>{
    return this.friendRef;
  }

  getAllFriend(userId: string): AngularFireList<FriendModel>{
    this.tmpFriend = this.db.list(this.dbPath, ref => ref.child(userId));
    return this.tmpFriend;
  }

  newFriend(friendEmail: string, userId: string, count: number): any {
    count = count + 1;
    this.tmp = '/friends-' + count;
    return this.friendRef.update(userId + '/' + this.tmp, {
      email: friendEmail
    });
  }
}
