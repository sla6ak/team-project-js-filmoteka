import { Thema } from './class-thems';
import Pagination from 'tui-pagination';
import '../../node_modules/tui-pagination/dist/tui-pagination.min.css';

export class Paginations extends Thema {
  constructor() {
    super();
  }

  buildPagination = () => {
    const optionPagin = {
      totalItems: 10,
      itemsPerPage: 10,
      visiblePages: 10,
      page: 1,
      centerAlign: true,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
      template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
          '<a href="#" class="tui-page-btn tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</a>',
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</span>',
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</a>',
      },
    };
    const pagination = new Pagination(this.refs.containerPagination, optionPagin);

    pagination.on('beforeMove', evt => {
      console.log(evt);
      const { page } = evt;
      const result = ajax.call({ page });
      console.log(result);

      if (result) {
        pagination.movePageTo(page);
      } else {
        return false;
      }
    });

    console.log(pagination);
  };
  //   get x() {
  //     console.log();
  //   }
  //   set x(newWord) {
  //     console.log();
  //   }
}
