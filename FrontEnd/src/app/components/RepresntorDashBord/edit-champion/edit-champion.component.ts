import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RepresntorService } from 'src/app/core/services/represntor.service';
@Component({
  selector: 'app-edit-champion',
  templateUrl: './edit-champion.component.html',
  styleUrls: ['./edit-champion.component.scss']
})
export class EditChampionComponent {
  constructor(private _RepresntorService: RepresntorService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,) { }
  isLoading: boolean = false;
  model = {
    name: '',
    weight: '',
    typeOfChampionship: '',
    isYoungs: null,
    age: null,
  }
  errMessage: string = '';
  agentId: any;
  editChampionship: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+(([' -][A-Za-z()])?[A-Za-z()]*)*(\d+)?$/)]),
    weight: new FormControl(''),
    typeOfChampionship: new FormControl('', [Validators.required]),
    isYoungs: new FormControl(''),
    age: new FormControl(''),
  })
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.agentId = params.get('id');
        console.log(this.agentId);
        this._RepresntorService.getSingleChampionship(this.agentId).subscribe({
          next: (res) => {
            this.model.name = res.data[0].name;
            this.model.weight = res.data[0].weight;
            this.model.typeOfChampionship = res.data[0].typeOfChampionship;
            this.model.isYoungs = res.data[0].isYoungs;
            this.model.age = res.data[0].age;

          }
        })
      }
    })

  }
  handelForm() {
    this.isLoading = true
    this._RepresntorService.editChampionship(this.agentId, this.editChampionship.value).subscribe({
      next: () => {
        this.isLoading = false;
        this._Router.navigate(['/mangeChampion'])
        this._ToastrService.success('The Champion has been Updated successfully');

      }, error: (err) => {
        this.isLoading = false;
        this.errMessage = err.error.data
      }

    })

  }
}
