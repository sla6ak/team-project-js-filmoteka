import { Thema } from './class-thems';
import Pagination from 'tui-pagination';

export class Paginations extends Thema {
  constructor() {
    super();
  }

  buildPagination = () => {
    const optionPagin = {
      totalItems: 100,
      itemsPerPage: 10,
      visiblePages: 5,
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

    this.pagination = new Pagination(this.refs.containerPagination, optionPagin);

    this.pagination.on('afterMove', async evt => {
      console.log(evt);

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
  };
  //   get x() {
  //     console.log();
  //   }
  //   set x(newWord) {
  //     console.log();
  //   }
}
