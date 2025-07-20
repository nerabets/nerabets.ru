import { makeAutoObservable, reaction } from "mobx";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Cookies from "js-cookie";
import axios from "axios";

class UserStore {
    visitorId: string = "";
    entityId: string = ""

    constructor() {
        makeAutoObservable(this),
        this.initializeVisitorId()
        this.initializeEntityId()
    }
    async initializeVisitorId() {
    const savedId = Cookies.get("visitor_id");
    
    if (savedId) {
      this.visitorId = savedId;
      return;
    }

    const newId = await this.generateFingerprint();
    this.setVisitorId(newId);
  }

  async initializeEntityId() {
    const savedId = Cookies.get("entity_id");
    if (savedId) {
      this.entityId = savedId;
      return;
    }

    if(this.visitorId.length < 5) {
        await this.initializeVisitorId()
        this.initializeEntityId
    }
    await axios.post("http://localhost:8000/handshake", {}, 
        {
            headers : {
            "X-Visitor-ID" : this.visitorId,
            "X-Entity-ID" : this.entityId
        }, 
        withCredentials: true,
        timeout: 6000,
    }

    ).then((responce) => {
        if(responce.status === 200) {
            this.entityId = responce.data["entity_id"]
            Cookies.set("entity_id", responce.data["entity_id"], { 
            expires: 365, // Хранить 1 год
            secure: true,
            sameSite: "strict"
            });
        }
    })
  }

  async generateFingerprint(): Promise<string> {
    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();
    return visitorId;
  }

  setVisitorId(id: string) {
    this.visitorId = id;
    Cookies.set("visitor_id", id, { 
      expires: 365, // Хранить 1 год
      secure: true,
      sameSite: "strict"
    });
  }
}

export const userStore = new UserStore()