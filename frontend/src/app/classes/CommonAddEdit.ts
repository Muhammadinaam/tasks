import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServerInfo } from './ServerInfo';

export class CommonAddEdit implements OnInit
{
    mainForm:FormGroup;
    loading = false;
    editingId: any;
    http: any;
    router: any;
    activatedRoute: any;
    url:string;
    
    constructor(_http, _router, _activatedRoute, _url) {
        this.http = _http;
        this.router = _router;
        this.activatedRoute = _activatedRoute;
        this.url = _url;
    }

    async initMainForm() {
        throw new Error("initMainForm Method not implemented.");
    }

    async ngOnInit() {
        this.loading = true;
        await this.initMainForm();

        this.editingId = this.activatedRoute.snapshot.paramMap.get('id');
        if(this.editingId != null && this.editingId != '') {
            await this.http.get(ServerInfo.Url + '/api/'+this.url+'/'+this.editingId+'/edit').toPromise()
            .then(data => {
                this.patchFormValues(data);
            })
        }

        this.loading = false;
    }

    patchFormValues(data){
        throw new Error("patchFormValues Method not implemented");
    }

    onSubmit(){
        this.loading = true;
        let observable = this.http.post(ServerInfo.Url + "/api/" + this.url, this.mainForm.value);
    
        if(this.editingId != null && this.editingId != '') {
          observable = this.http.put(ServerInfo.Url + "/api/"+this.url+"/" + this.editingId, this.mainForm.value);
        }
          
        observable.subscribe(data => {
          alert(data['message']);
    
          if(data['success']) {
            this.router.navigate(['/' + this.url]);
          }
        }).add(() => this.loading = false);
    }

}