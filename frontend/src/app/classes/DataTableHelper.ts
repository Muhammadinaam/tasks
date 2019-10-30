import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from './DataTablesResponse';
import { ServerInfo } from './ServerInfo';


export class DataTableHelper
{
    public static generateDataTableOptions(obj: any, dataTableUrl: string, tableColumns: { data: string; name: string; }[]): DataTables.Settings {
        return {
          pagingType: 'full_numbers',
          pageLength: 2,
          serverSide: true,
          processing: true,
          ajax: (dataTablesParameters: any, callback) => {
            obj.http
              .post(ServerInfo.Url + dataTableUrl, dataTablesParameters, {}).subscribe(resp => {
                obj.data = resp.data;
                callback({
                  recordsTotal: resp.recordsTotal,
                  recordsFiltered: resp.recordsFiltered,
                  data: []
                });
              });
          },
          columns: tableColumns
        };
      }
}