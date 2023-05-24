import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: AngularFireStorage
  ) { }
  async upload(path: string, file:any) {
    const res = await this.storage.upload(path, file);
    const res_1 = await this.getUrl(path);
    return res_1;
  }

  async changeFile(path:any, file:any) {
    this.storage.ref(path).delete()
    return this.storage.upload(path, file)
  }

  getUrl(path: string) {
    return new Promise(resolve => {
      this.storage.ref(path).getDownloadURL()
        .subscribe(
          (data: any) => {
            resolve(data);
          })
    })
  }

  async deleteImage(path:any) {
    try {
      const res = await new Promise((resolve, reject) => {
        this.storage.ref(path).delete()
          .subscribe(
            (data: any) => {
              resolve(data);
            }, error => {
              reject(error)
            })
      })
      return res
    }
    catch (err:any) {
      throw Error(err)
    }
  }
}