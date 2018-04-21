import { SearchPipePipe } from './search-pipe.pipe';

describe('SearchPipePipe', () => {
  let list = [
    { id: 1, name: 'admin Role' },
    { id: 2, name: 'user Role' },
    { id: 3, name: 'client Role' },
  ];
  let search = 'user';
  const pipe = new SearchPipePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if list provided is empty', () => {
    let initList = [];

    let filteredList = pipe.transform(initList, 'abc');

    expect(filteredList).toEqual(initList);
  });

  it('should return empty array if no list provided', () => {
    let initList = null;

    let filteredList = pipe.transform(initList, 'abc');

    expect(filteredList.length).toBe([].length);
  });

  it('should return initial array if no search text provided', () => {
    let initList = list;

    let filteredList = pipe.transform(initList, '');

    expect(filteredList).toEqual(initList);
  });

  it('should return empty array if no search result found for "ABC"', () => {
    let initList = list;

    let filteredList = pipe.transform(initList, 'ABC');

    expect(filteredList).toEqual([]);
  });

  it('should return filterd array if search result found for "user"', () => {
    let initialList = list;
    let filteredList = pipe.transform(initialList,'user');
    let flag = false;

    filteredList.forEach(element => {
      if(JSON.stringify(element).toLowerCase().indexOf(search.toLowerCase()) >= 0){
        flag = true;
      }
    });

    expect(flag).toBeTruthy();
  });
});
