import { OnInit } from '@angular/core';
import { DataTableHelper } from './DataTableHelper';
import { ServerInfo } from './ServerInfo';

export class CommonList implements OnInit
{
    http: any;
    router: any;
    dtOptions: DataTables.Settings = {};
    data;
    url = 'roles';
    dataTableUrl = "/api/"+this.url+"-datatable";
    tableColumns: any;

    constructor(_http, _router, _url, _tableColumns) {
        this.http = _http;
        this.router = _router;       
        this.url = _url;
        this.dataTableUrl = "/api/"+this.url+"-datatable";
        this.tableColumns = _tableColumns;
    }

    ngOnInit(): void {
        this.dtOptions = DataTableHelper.generateDataTableOptions(this, this.dataTableUrl, this.tableColumns);
    }

    edit(id) {
        this.router.navigate([this.url+ '/' + id]);
    }

    delete(id) {
        this.http.delete(ServerInfo.Url + "/api/"+this.url+"/" + id)
        .subscribe(data => {
            if(data['success']) {
                alert(data['message']);
                this.data = (<Array<any>>this.data).filter(item => {
                item.id != id;
                });
            }
        })
    }

    addNew() {
        this.router.navigate([ this.url + '/create']);
    }
}