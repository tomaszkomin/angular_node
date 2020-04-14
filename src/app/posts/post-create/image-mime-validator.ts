import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

export const imageMimeType  = (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
  let isValid = false;
  const file = control.value as File;
  const fileReader = new FileReader();
  const fileReaderObs = Observable.create((observer: Observer<any>) => {
    fileReader.addEventListener('loadedend', () => {
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
        let header = '';
        for ( let i = 0; i < arr.length ; i++ ) {
          header += arr[i].toString(16);
        }
        switch (header) {
          case '89504e47':
            isValid = true;
            break;
          case 'ffd8ffe0':
          case 'ffd8ffe1':
          case 'ffd8ffe2':
          case 'ffd8ffe3':
          case 'ffd8ffe8':
            isValid = true;
            break;
          default:
            isValid = false;
            break;
        }
        if (isValid) {
          observer.next(null);
        } else {
          observer.next({invalidMimeType: true});
        }
        observer.complete();
    });
  });
  fileReader.readAsArrayBuffer(file);
  return fileReaderObs;
};