import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RepresntorService } from 'src/app/core/services/represntor.service';
@Component({
  selector: 'app-add-champion',
  templateUrl: './add-champion.component.html',
  styleUrls: ['./add-champion.component.scss']
})
export class AddChampionComponent {
  constructor(private _RepresntorService: RepresntorService,
    private _ToastrService: ToastrService,
    private _Router: Router,) { }
  errMessage: string = '';
  isLoading: boolean = false;
  nameArray: any = [];
  addChampion: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+(([' -][A-Za-z()])?[A-Za-z()]*)*(\d+)?$/)]),
    gender: new FormControl('', [Validators.required]),
    weight: new FormControl(''),
    typeOfChampionship: new FormControl('', [Validators.required]),
    isYoungs: new FormControl(''),
    age: new FormControl(''),
  })
  // ngOnInit(): void {
  //   this._RepresntorService.addChampion().subscribe({
  //     next:(res)=>{
  //       let data =res.data

  //       for (let i = 0; i < data.length; i++) {
  //         this.nameArray.push(data[i].associationName)

  //       }
  //       console.log( this.nameArray);

  //     }
  //   })

  // }

  handelForm() {
    const userData = this.addChampion.value;
    this.isLoading = true
    if (this.addChampion.valid) {
      this._RepresntorService.addChampion(userData).subscribe({
        next: () => {
          this.isLoading = false;
          this._Router.navigate(['/mangeChampion'])
          this._ToastrService.success('The Champion has been added successfully');
          this.errMessage = ''

        }, error: (err) => {
          this.isLoading = false;
          this.errMessage = err.error.message

        }
      })
    }
  }

}
