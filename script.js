const sideBarNews = document.getElementById('side');
const containerSideBar = sideBarNews.querySelector('.container');
const items = containerSideBar.querySelectorAll('.new-item');
let current = null;
items.forEach((item) => {
  item.addEventListener('dragstart', () => {
    setTimeout(() => {
      item.classList.add('dragging');
      /* Chỉnh sửa lại con trỏ chuột khi kéo phần tử. */
      const draggingElement = containerSideBar.querySelector('.dragging');
      const labelElement = draggingElement.getElementsByTagName('label');
      current = labelElement[0];
      current.style.cursor = 'ns-resize';
    }, 0);
  });
  item.addEventListener('dragend', () => {
    item.classList.remove('dragging');
    current.style.cursor = 'default';
  });
})

const initSideBarNews = event => {
  event.preventDefault();
  const draggingItem = document.querySelector('.dragging');
  let siblingItems = [...containerSideBar.querySelectorAll('.new-item:not(.dragging)')];
  let nextSiblingItem = siblingItems.find(sibling => {
    return event.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });

  containerSideBar.insertBefore(draggingItem, nextSiblingItem);
}

sideBarNews.addEventListener('dragover', initSideBarNews);
sideBarNews.addEventListener('dragenter', event => event.preventDefault());


/* lấy danh sách các buttons ở phần main. */
const register = document.querySelector('.register');
const clearAll = document.querySelector('.clear-all');

register.addEventListener('click', () => {
  /* Xử lí sự kiện khi thực hiện nhất vào nút đăng kí. */
  /* Viết luôn chức năng xác định lỗi của dữ liệu nhận vào trong hàm này. */
  /* Xác định lỗi khi nhập tên. */
  let validName = true;
  let validAddress = true;
  let validDate = true;
  let validEmail = true;
  let validPhoneNumber = true;
  let validGender = true;
  let validItems = true;
  const inputName = document.getElementById('input-name');
  let name = inputName.getElementsByTagName('input');
  name = name[0];
  let valueName = name.value;
  valueName = valueName.trim();
  let words = valueName.split(' ');
  const emptyName = document.getElementById('empty-name');
  const errorName = document.getElementById('error-name');
  if (words.length == 1 && words[0].charAt(0) == '') {
    /* Lúc này người dùng chưa nhập thông tin họ tên. */
    name.style.border = '1px solid red';
    if (!errorName.classList.contains('none-display')) {
      errorName.classList.add('none-display');
    }
    if (emptyName.classList.contains('none-display')) {
      emptyName.classList.remove('none-display');
    }
    validName = false;
  } else if (words.length < 2) {
    name.style.border = '1px solid red';
    if (!emptyName.classList.contains('none-display')) {
      emptyName.classList.add('none-display');
    }
    if (errorName.classList.contains('none-display')) {
      errorName.classList.remove('none-display');
    }
    validName = false;
  } else {
    name.style.border = '1px solid black';
    if (!emptyName.classList.contains('none-display'))
      emptyName.classList.add('none-display');
    if (!errorName.classList.contains('none-display'))
      errorName.classList.add('none-display');
      validName = true;
  }

  // Xác định lỗi khi nhập địa chỉ.
  /* Lấy các element thuộc phần địa chỉ */
  const inputAddress = document.getElementById('input-address');
  let address = inputAddress.getElementsByTagName('input');
  address = address[0];
  let valueAddress = address.value;
  valueAddress = valueAddress.trim();
  let wordsAdd = valueAddress.split(' ');
  const emptyAddress = document.getElementById('empty-address');
  const errorAddress = document.getElementById('error-address');
  if (wordsAdd.length == 1 && wordsAdd[0].charAt(0) == '') {
    /* Lúc này người dùng chưa nhập thông tin họ tên. */
    validAddress = false;
    address.style.border = '1px solid red';
    if (!errorAddress.classList.contains('none-display')) {
      errorAddress.classList.add('none-display');
    }
    if (emptyAddress.classList.contains('none-display')) {
      emptyAddress.classList.remove('none-display');
    }
  } else if (wordsAdd.length < 2) {
    validAddress = false;
    address.style.border = '1px solid red';
    if (!emptyAddress.classList.contains('none-display')) {
      emptyAddress.classList.add('none-display');
    }
    if (errorAddress.classList.contains('none-display')) {
      errorAddress.classList.remove('none-display');
    }
  } else {
    validAddress = true;
    address.style.border = '1px solid black';
    if (!emptyAddress.classList.contains('none-display'))
      emptyAddress.classList.add('none-display');
    if (!errorAddress.classList.contains('none-display'))
      errorAddress.classList.add('none-display');
  }

  /* Xác định lỗi khi nhập số điện thoại. */

  /* Lấy thông tin phần số điện thoại. */
  const inputPhoneNumber = document.getElementById('input-phone-number');
  let phoneNumber = inputPhoneNumber.getElementsByTagName('input');
  phoneNumber = phoneNumber[0];
  let valuePhoneNumber = phoneNumber.value;
  valuePhoneNumber = valuePhoneNumber.trim();
  let wordsPhone = valuePhoneNumber;
  const emptyPhone = document.getElementById('empty-phone');
  const errorPhone = document.getElementById('error-phone');
  if (wordsPhone.length == 0) {
    /* Lúc này người dùng chưa nhập thông tin họ tên. */
    validPhoneNumber = false;
    phoneNumber.style.border = '1px solid red';
    if (!errorPhone.classList.contains('none-display')) {
      errorPhone.classList.add('none-display');
    }
    if (emptyPhone.classList.contains('none-display')) {
      emptyPhone.classList.remove('none-display');
    }
  } else if (wordsPhone.length < 10 || wordsPhone[0].charAt(0) != '0' || !isPhoneNumber(wordsPhone[0])) {
    validPhoneNumber = false;
    phoneNumber.style.border = '1px solid red';
    if (!emptyPhone.classList.contains('none-display')) {
      emptyPhone.classList.add('none-display');
    }
    if (errorPhone.classList.contains('none-display')) {
      errorPhone.classList.remove('none-display');
    }
  } else {
    validPhoneNumber = true;
    phoneNumber.style.border = '1px solid black';
    if (!emptyPhone.classList.contains('none-display'))
      emptyPhone.classList.add('none-display');
    if (!errorPhone.classList.contains('none-display'))
      errorPhone.classList.add('none-display');
  }

  /* Kiểm tra thông tin giới tính đã được chọn chưa. */
  /* Lấy thông tin giới tính. */
  const genderRadio = document.querySelectorAll('.gender-radio');
  let valueGender = "";/* Biến lưu thông tin giới tính của khách hàng. */
  let genderSelected = null;
  genderRadio.forEach((element) => {
    if (element.checked == true) {
      genderSelected = element;
    }
  })
  if (genderSelected != null) {
    valueGender = genderSelected.getAttribute('value');
  }
  if (valueGender == "Male")
    valueGender = "Nam";
  else if (valueGender == "Female")
    valueGender = "Nữ";
  else valueGender = "";
  const emptyGender = document.getElementById('empty-gender');
  if (valueGender == "") {
    validGender = false;
    if (emptyGender.classList.contains('none-display')) {
      emptyGender.classList.remove('none-display');
    }
  } else if (valueGender != "") {
    if (!emptyGender.classList.contains('none-display')) {
      emptyGender.classList.add('none-display');
    }
    validGender = true;
  }

  /* Kiểm tra thông tin ngày đặt hàng của khách hàng. */
  /* Lấy thông tin phần ngày giao hàng. */
  const deliveryDate = document.getElementById('deliveryDate');
  const valueDate = deliveryDate.value;
  let dateDelivery = new Date(valueDate);
  const emptyDate = document.getElementById('empty-date');
  const errorDate = document.getElementById('error-date');
  const currentDate = new Date();
  if (valueDate == "") // Khách hàng chưa đặt lịch giao hàng.
  {
    validDate = false;
    if (!errorDate.classList.contains('none-display')) {
      errorDate.classList.add('none-display');
    }
    if (emptyDate.classList.contains('none-display')) {
      emptyDate.classList.remove('none-display')
    }
  } else if (compareDates(dateDelivery, currentDate) == -1) {
    validDate = false;
    /* Ngày vận chuyển nhỏ hơn ngày hiện tại. */
    if (!emptyDate.classList.contains('none-display')) {
      emptyDate.classList.add('none-display');
    }
    if (errorDate.classList.contains('none-display')) {
      errorDate.classList.remove('none-display');
    }
  } else {
    validDate = true;
    if (!emptyDate.classList.contains('none-display')) {
      emptyDate.classList.add('none-display');
    }
    if (!errorDate.classList.contains('none-display')) {
      errorDate.classList.add('none-display');
    }
  }




  /* Lấy thông tin email */
  const inputEmail = document.getElementById('input-email');
  let email = inputEmail.getElementsByTagName('input');
  email = email[0];
  let valueEmail = email.value;
  address = address[0];
  valueEmail = valueEmail.trim();
  const errorEmail = document.getElementById('error-email');
  const emptyEmail = document.getElementById('empty-email');
  if (valueEmail == "") {
    /* Email chưa điền */
    validEmail = false;
    email.style.border = '1px solid red';
    if (!errorEmail.classList.contains('none-display')) {
      errorEmail.classList.add('none-display');
    }
    if (emptyEmail.classList.contains('none-display')) {
      emptyEmail.classList.remove('none-display');
    }
  } else if (!checkEmail(valueEmail)) {
    /* Email không hợp lệ */
    /* Email hợp lệ là email phải bắt đầu bằng chữ cái và có @gmail.com phía sau */
    validEmail = false;
    email.style.border = '1px solid red';
    if (!emptyEmail.classList.contains('none-display')) {
      emptyEmail.classList.add('none-display');
    }
    if (errorEmail.classList.contains('none-display')) {
      errorEmail.classList.remove('none-display');
    }
  } else {
    validEmail = true;
    email.style.border = '1px solid black';
    if (!errorEmail.classList.contains('none-display')) {
      errorEmail.classList.add('none-display');
    }
    if (!emptyEmail.classList.contains('none-display')) {
      emptyEmail.classList.add('none-display');
    }
  }

  let nameList = handleProducts();
  if(nameList == "")
    validItems = false;
  if (validName && validGender && validAddress && validDate && validPhoneNumber && validEmail && validItems) {
    let bodyTable = document.getElementsByTagName('tbody');
    bodyTable = bodyTable[0];
    let tableRow = document.createElement('tr');
    tableRow.innerHTML = `
    <td>${valueName}</td>
    <td>${valueGender}</td>
    <td>${valueAddress}</td>
    <td>${valueDate}</td>
    <td>${nameList}</td>
  `;
    bodyTable.appendChild(tableRow);
  }else {
    alert("Xin Nhập Lại Thông Tin Cá Nhân!");
  }
})


function checkEmail(valueEmail) {
  /* Email hợp lệ là email phải bắt đầu bằng chữ cái và có @gmail.com phía sau */
  if ((65 <= valueEmail.charCodeAt(0) && valueEmail.charCodeAt(0) <= 90 || 97 <= valueEmail.charCodeAt(0) && valueEmail.charCodeAt(0) <= 122) && valueEmail.endsWith("@gmail.com"))
    return true;
  return false;

}

function isPhoneNumber(phoneNumber) {
  /* Hàm kiểm tra xem một số đưa vào có phải số điện thoại hợp lệ không.
  Nếu có chứa chữ các thì là không hợp lệ. */
  for (let index = 0; index < phoneNumber.length; index++) {
    if (phoneNumber.charAt(index) != '0' && phoneNumber.charAt(index) != '1' && phoneNumber.charAt(index) != '2' && phoneNumber.charAt(index) != '3' && phoneNumber.charAt(index) != '4' && phoneNumber.charAt(index) != '5' && phoneNumber.charAt(index) != '6' && phoneNumber.charAt(index) != '7' && phoneNumber.charAt(index) != '8' && phoneNumber.charAt(index) != '9') {
      return false;
    }
  }
  return true;
}

function compareDates(date_1, date_2) {
  if (date_1.getFullYear() < date_2.getFullYear())
    return -1;
  else if (date_1.getFullYear() > date_2.getFullYear())
    return 1;
  else if (date_1.getMonth() < date_2.getMonth())
    return -1;
  else if (date_1.getMonth() > date_2.getMonth())
    return 1;
  else if (date_1.getDate() < date_2.getDate())
    return -1;
  else if (date_1.getDate() > date_2.getDate())
    return 1;
  return 0;
}


/* Xử lí phần đặt hàng của khách hàng. */
const productList = document.querySelector('.products-list');
const productListItems = productList.querySelector('.list-items');
const productSelected = document.querySelector('.products-selected');
const productSelectedItems = productSelected.querySelector('.list-items');
const products = document.querySelector('.products');
const allItems = products.querySelectorAll('.item');


allItems.forEach(item => {
  item.addEventListener('click', () => {
    if (item.classList.toggle('selected'));
  })
})
/* Lấy toàn bộ phần tử mặt hàng có thể kéo được. */

allItems.forEach(item => {
  item.addEventListener('dragstart', (event) => {
    let element = event.target;
    productSelectedItems.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    productSelectedItems.addEventListener('drop', (event) => {
      productSelectedItems.appendChild(element);
      element = null;
    });
    productListItems.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    productListItems.addEventListener('drop', (event) => {
      productListItems.appendChild(element);
      element = null;
    });
  })
})


const moveRight = document.querySelector('.moveRight');
const moveAllRight = document.querySelector('.moveAllRight');
const moveLeft = document.querySelector('.moveLeft');
const moveAllLeft = document.querySelector('.moveAllLeft');

moveRight.addEventListener('click', () => {
  const leftItems = productListItems.querySelectorAll('.item');
  leftItems.forEach(item => {
    if (item.classList.contains('selected')) {
      /* Nếu mặt hàng nào được chọn thì di chuyện nó sang danh sách bên phải. */
      let selected = item;
      productSelectedItems.appendChild(selected);
      selected.classList.toggle('selected');
    }
  })
});
moveLeft.addEventListener('click', () => {
  const rightItems = productSelectedItems.querySelectorAll('.item');
  rightItems.forEach(item => {
    if (item.classList.contains('selected')) {
      /* Nếu mặt hàng nào được chọn thì di chuyện nó sang danh sách bên phải. */
      let selected = item;
      productListItems.appendChild(selected);
      selected.classList.toggle('selected');
    }
  })
});
moveAllRight.addEventListener('click', () => {
  const leftItems = productListItems.querySelectorAll('.item');
  leftItems.forEach(item => {
    productSelectedItems.appendChild(item);
    item.classList.remove('selected');
  })
});
moveAllLeft.addEventListener('click', () => {
  const rightItems = productSelectedItems.querySelectorAll('.item');
  rightItems.forEach(item => {
    productListItems.appendChild(item);
    item.classList.remove('selected');
  })
});

/* Xử lí thao tác của Đăng kí và Xoá hết */
clearAll.addEventListener('click', () => {
  const rightItems = productSelectedItems.querySelectorAll('.item');
  rightItems.forEach(item => {
    productListItems.appendChild(item);
    item.classList.remove('selected');
  });
})

function handleProducts() {
  /* Hàm xử lí thông tin tên sản phẩm. */
  let result = "";
  const productSelected = document.querySelector('.products-selected');
  const productSelectedItems = productSelected.querySelector('.list-items');
  const items = productSelectedItems.getElementsByClassName('item');
  Array.from(items).forEach(item => {
    let tagName = item.getElementsByClassName('name');
    tagName = tagName[0];
    result += tagName.innerHTML;
    result += "; ";
  })
  return result = result.substring(0, result.length - 1);
}

