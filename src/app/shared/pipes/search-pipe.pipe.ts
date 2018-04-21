import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(list: any[], searchText?: string): any[] {

    //IF NO LIST DATA
    if (!list || !list.length) return [];

    //IF NO SEARCHDATA
    if (!searchText) return list;

    //CONVERT TO LOWER CASE
    searchText = searchText.toLowerCase();

    // Assuming entire array has same keys in its objects, get an array of keys.
    const keys = Object.keys(list[0]);
    if (keys.length <= 0) {
      return list;

    }
    // Traverse the array of keys and remove a key value pair with key as 'id'
    keys.forEach((element, index) => {
      if (element === 'id') {
        keys.splice(index, 1);
      }
    });
    // Logic to go through all the objects and find the objects whose value matches uppercased filter.
    list = (list.filter((v) => v && keys.some(
      (k) => v[k] === undefined || v[k] === null ? false : v[k].toString().toLowerCase().indexOf(searchText) >= 0))
    );
    return list;
  }

}
