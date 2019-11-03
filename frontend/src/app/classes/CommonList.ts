import { OnInit, ViewChild } from '@angular/core';
import { DataTableHelper } from './DataTableHelper';
import { ServerInfo } from './ServerInfo';
import { DataTableDirective } from 'angular-datatables';

export class CommonList implements OnInit
{
    http: any;
    router: any;
    dtOptions: DataTables.Settings = {};
    data;
    url = 'roles';
    dataTableUrl = "/api/"+this.url+"-datatable";
    tableColumns: any;

    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    currentUser: any;
    auth: any;

    constructor(_http, _router, _url, _tableColumns, _auth) {
        this.http = _http;
        this.router = _router;       
        this.url = _url;
        this.dataTableUrl = "/api/"+this.url+"-datatable";
        this.tableColumns = _tableColumns;
        this.auth = _auth;
    }

    async ngOnInit() {
        this.dtOptions = DataTableHelper.generateDataTableOptions(this, this.dataTableUrl, this.tableColumns);
        
        this.currentUser = this.auth.currentUser;

        if(this.currentUser == null) {
            this.currentUser = await this.auth.getCurrentUser();
        }
    }

    edit(id) {
        this.router.navigate([this.url+ '/' + id]);
    }

    rerender_datatable() {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }

    delete(id) {

        if( confirm("Are you sure to delete?") == false ) {
            return;
        }

        this.http.delete(ServerInfo.Url + "/api/"+this.url+"/" + id)
        .subscribe(data => {
            alert(data['message']);
            if(data['success']) {
                this.rerender_datatable();
            }
        })
    }

    addNew() {
        this.router.navigate([ this.url + '/create']);
    }
}