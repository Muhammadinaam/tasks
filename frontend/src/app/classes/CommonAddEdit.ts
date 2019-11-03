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
    auth: any;
    currentUser: any;
    
    constructor(_http, _router, _activatedRoute, _url, _auth) {
        this.http = _http;
        this.router = _router;
        this.activatedRoute = _activatedRoute;
        this.url = _url;
        this.auth = _auth;
    }

    async initMainForm() {
        throw new Error("initMainForm Method not implemented.");
    }

    async ngOnInit() {
        this.loading = true;

        this.currentUser = this.auth.currentUser;
        if(this.currentUser == null) {
            this.currentUser = await this.auth.getCurrentUser();
        }

        await this.initMainForm();

        this.editingId = this.activatedRoute.snapshot.paramMap.get('id');
        if(this.editingId != null && this.editingId != '') {
            await this.http.get(ServerInfo.Url + '/api/'+this.url+'/'+this.editingId+'/edit').toPromise()
            .then(data => {

                if(data == null) {
                    alert('No data found');
                    this.router.navigate(['/' + this.url]);        
                }

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