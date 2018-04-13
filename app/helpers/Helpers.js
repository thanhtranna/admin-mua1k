import moment from 'moment';
import { MAX_SIZE_UPLOAD } from '../constants/common';

export function correctHeight() {
  const pageWrapper = $('#page-wrapper');
  const navbarHeight = $('nav.navbar-default').height();
  const wrapperHeigh = pageWrapper.height();

  if (navbarHeight > wrapperHeigh) {
    pageWrapper.css('min-height', navbarHeight + 'px');
  }

  if (navbarHeight <= wrapperHeigh) {
    if (navbarHeight < $(window).height()) {
      pageWrapper.css('min-height', $(window).height() + 'px');
    } else {
      pageWrapper.css('min-height', navbarHeight + 'px');
    }
  }

  if ($('body').hasClass('fixed-nav')) {
    if (navbarHeight > wrapperHeigh) {
      pageWrapper.css('min-height', navbarHeight + 'px');
    } else {
      pageWrapper.css('min-height', $(window).height() - 60 + 'px');
    }
  }
}

export function detectBody() {
  if ($(document).width() < 769) {
    $('body').addClass('body-small');
  } else {
    $('body').removeClass('body-small');
  }
}

export function smoothlyMenu() {
  if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
    // Hide menu in order to smoothly turn on when maximize menu
    $('#side-menu').hide();
    // For smoothly turn on menu
    setTimeout(function() {
      $('#side-menu').fadeIn(400);
    }, 200);
  } else if ($('body').hasClass('fixed-sidebar')) {
    $('#side-menu').hide();
    setTimeout(function() {
      $('#side-menu').fadeIn(400);
    }, 100);
  } else {
    // Remove all inline style from jquery fadeIn function to reset menu state
    $('#side-menu').removeAttr('style');
  }
}

export function activeRoute(routeName, pathRootName) {
  let status = '';
  let temp = 0;

  if (Array.isArray(routeName)) {
    for (let i = 0; i < routeName.length; i += 1) {
      let pathRoot = cutRoute(pathRootName, routeName[i].length);
      for (let j = 0; j < routeName.length; j += 1) {
        if (pathRoot.indexOf(routeName[j]) > -1) {
          temp += 1;
        }
      }
    }
    if (temp > 0) status = 'active';
  } else {
    if (pathRootName.indexOf(routeName) > -1) status = 'active';
  }
  temp = 0;
  return status;
}

export function secondLevelActive(routeName, pathRootName) {
  return pathRootName.indexOf(routeName) > -1
    ? 'nav nav-second-level collapse in'
    : 'nav nav-second-level collapse';
}

export function truncateText(text, maxLength = 50) {
  if (text === undefined || text === null) return null;
  if (text.length > maxLength) {
    text = text.substr(0, maxLength) + '...';
  }
  return text;
}

export function cutRoute(text, maxLength = 10) {
  if (text === undefined || text === null) return null;
  if (text.length > maxLength) {
    text = text.substr(0, maxLength);
  }
  return text;
}

export function displayNumberRecord(page, limit, index) {
  return parseInt(page) === 1 ? index + 1 : page * limit - limit + index + 1;
}

export function checkUndefined(value) {
  return value !== undefined ? value : null;
}

export function imagesPreview(images, placeToInsertImagePreview) {
  $(placeToInsertImagePreview + ' img').remove();
  if (images.files) {
    let filesAmount = images.files.length;
    let errors = [];

    for (let i = 0; i < filesAmount; i++) {
      if (images.files[i].size > MAX_SIZE_UPLOAD) {
        errors.push(images.files[i].name);
      }

      let reader = new FileReader();

      reader.onload = function(event) {
        $(
          $.parseHTML(
            '<img class="img-responsive img-thumbnail" width="250px" height="250px">'
          )
        )
          .attr('src', event.target.result)
          .appendTo(placeToInsertImagePreview);
      };

      reader.readAsDataURL(images.files[i]);
    }
    return errors;
  }
}

export function formatDate(date) {
  if (date === null || date === undefined) return '---';
  return moment(date).format('MM/DD/YYYY - HH:mm:ss');
}
