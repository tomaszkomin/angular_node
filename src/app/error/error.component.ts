import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent implements OnInit {
	public message = "unregistred error occured";
	constructor(@Inject(MAT_DIALOG_DATA) public data: {message:string}) { }

	ngOnInit(): void {
	}

}
