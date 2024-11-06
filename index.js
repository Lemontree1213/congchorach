$(document).ready(function () {
  $("#searchKey").click(function () {
    getDSPhacdo();
  });
  $(document).ready(function () {
    // Hàm tìm kiếm khi người dùng nhập vào ô input
    $("#search-dvkt").on("keyup", function () {
      var searchTerm = $(this).val().toLowerCase(); // Lấy giá trị nhập và chuyển về chữ thường

      // Lọc các tùy chọn dựa trên từ khóa
      $("#dvkt-options .dropdown-option").each(function () {
        var optionText = $(this).find(".item-header").text().toLowerCase(); // Lấy văn bản tên và mã dịch vụ kỹ thuật

        // Kiểm tra xem văn bản có chứa từ khóa không
        if (optionText.includes(searchTerm)) {
          $(this).css("display", "block"); // Hiển thị tùy chọn nếu phù hợp
        } else {
          $(this).css("display", "none"); // Ẩn tùy chọn nếu không phù hợp
        }
      });
    });
    // Lựa chọn tùy chọn khi người dùng nhấp vào
    $("#dvkt-options").on("click", ".dropdown-option", function () {
      var selectedText = $(this).find(".item-header").text(); // Lấy tên và mã dịch vụ đã chọn
      // Hiển thị tên dịch vụ đã chọn trong ô input
      $("#search-dvkt").val(selectedText);
      // Ẩn tất cả các tùy chọn sau khi chọn
      $("#dvkt-options").css("display", "none");
    });

    // Đảm bảo khi nhấp vào input, nếu có giá trị thì nó sẽ xóa để bắt đầu tìm kiếm mới
    $("#search-dvkt").on("focus", function () {
      if ($(this).val() != "") {
        $(this).val(""); // Xóa giá trị nếu có trong input
        $("#dvkt-options").css("display", "block"); // Hiển thị lại các tùy chọn
      }
    });
    //
    $("#search-thuoc").on("keyup", function () {
      var searchTerm = $(this).val().toLowerCase(); // Lấy giá trị nhập và chuyển về chữ thường

      // Lọc các tùy chọn dựa trên từ khóa
      $("#thuoc-options .dropdown-option").each(function () {
        var optionText = $(this).find(".item-header").text().toLowerCase(); // Lấy văn bản tên và mã dịch vụ kỹ thuật

        // Kiểm tra xem văn bản có chứa từ khóa không
        if (optionText.includes(searchTerm)) {
          $(this).css("display", "block"); // Hiển thị tùy chọn nếu phù hợp
        } else {
          $(this).css("display", "none"); // Ẩn tùy chọn nếu không phù hợp
        }
      });
    });
    // Lựa chọn tùy chọn khi người dùng nhấp vào
    $("#thuoc-options").on("click", ".dropdown-option", function () {
      var selectedText = $(this).find(".item-header").text(); // Lấy tên và mã dịch vụ đã chọn
      // Hiển thị tên dịch vụ đã chọn trong ô input
      $("#search-thuoc").val(selectedText);
      // Ẩn tất cả các tùy chọn sau khi chọn
      $("#thuoc-options").css("display", "none");
    });

    // Đảm bảo khi nhấp vào input, nếu có giá trị thì nó sẽ xóa để bắt đầu tìm kiếm mới
    $("#search-thuoc").on("focus", function () {
      if ($(this).val() != "") {
        $(this).val(""); // Xóa giá trị nếu có trong input
        $("#thuoc-options").css("display", "block"); // Hiển thị lại các tùy chọn
      }
    });

    $(document).on("click", function (e) {
      if (!$(e.target).closest("#thuoc-dropdown").length) {
        $("#thuoc-options").css("display", "none"); // Ẩn danh sách nếu nhấp bên ngoài
      }
    });
  });

  $(document).ready(function () {
    $(".dropdown-display").click(function () {
      $(this).siblings(".dropdown-options").toggle();
    });

    $(".custom-dropdown").on("click", ".dropdown-option", function () {
      const selectedText = $(this).find(".item-header").text();
      const selectedValue = $(this).data("value");
      const dropdown = $(this).closest(".custom-dropdown");
      // Cập nhật hiển thị và chọn giá trị cho <select>
      dropdown.find("#search-dvkt").text(selectedText);
      dropdown.find("select").val(selectedValue);

      // Đóng dropdown
      dropdown.find(".dropdown-options").hide();
    });
    // Đóng dropdown nếu nhấp bên ngoài
    $(document).click(function (event) {
      if (!$(event.target).closest(".custom-dropdown").length) {
        $(".dropdown-options").hide();
      }
    });
  });
  $.getJSON("dvkt.json", function (response) {
    const dvktOptions = $("#dvkt-options");
    const dvktSelect = $("#dvkt-json");
    response.forEach(function (item) {
      // Thêm vào dropdown tùy chỉnh
      dvktOptions.append(`
      <div class="dropdown-option" data-value="${item.id}">
          <div class="item-header">${item.ten} [${item.ma}]</div>
            <div class="row">
              <div class="item-detail col">Giá DV: ${item.giaTrongGio}</div>
              <div class="item-detail col">Giá BHYT: ${item.giaBhyt}</div>
              <div class="item-detail col"> Mã ánh xạ: ${item.maIcd9}</div>
            </div>
            <div class="row"> 
              <div class="item-detail col">Tỉ lệ TT: ${item.tiLeThanhToan}%</div>
              <div class="item-detail col-8">Phụ thu: ${item.phuThuTrongGio}</div>
            </div>
      </div>
  `);
      // Thêm vào <select> ẩn
      dvktSelect.append(
        `<option value="${item.id}">${item.ten} - ${item.ma}</option>`
      );
    });
  }).fail(function () {
    console.error("Error loading dvkt.json");
  });
});

$(document).on("click", "#dvkt-options .dropdown-option", function () {
  // Lắng nghe sự kiện khi thay đổi dropdown dvkt
  const value = $(this).data("value");
  const textData = $(this).find(".item-header").text();
  $("#dvkt-json").val(value);
  const rowCount = $("#dvKyThuat tr").length + 1;
  // Thêm hàng mới vào bảng dvKyThuat
  const row = `
      <tr>
        <td>${rowCount}</td> <!-- Cột số thứ tự sẽ được cập nhật -->
        <td class="name-dvkt">${textData}</td>
        <td><input class="cong1" type="text" value=""></td>
        <td><input class="cong1 type="text" value=""></td>
        <td><input class="cong1 type="text" value=""></td>
        <td><input class="cong1 type="text" value=""></td>
        <td><input class="cong1 type="text" value=""></td>
        <td></td> <!-- Tổng SL, có thể tính sau -->
        <td><input type="checkbox"></td>
        <td><input type="checkbox"></td>
        <td><span id="btn-delete">&times;</span></td>
      </tr>
    `;
  $("#dvKyThuat").append(row); // Thêm hàng vào bảng
});

$.getJSON("thuoc.json", function (response) {
  const thuocOptions = $("#thuoc-options");
  const thuocSelect = $("#thuoc-json");

  response.forEach(function (item) {
    // Thêm vào dropdown tùy chỉnh
    thuocOptions.append(`
      <div class="dropdown-option" data-value="${item.id}">
          <div class="item-header">${item.ma} - ${item.ten}</div>
      </div>
  `);
    // Thêm vào <select> ẩn
    thuocSelect.append(
      `<option value="${item.id}">${item.ma} - ${item.ten}</option>`
    );
  });
});
// Lắng nghe sự kiện khi thay đổi dropdown thuoc
$(document).on("click", "#thuoc-options .dropdown-option", function () {
  const value = $(this).data("value");
  const textData = $(this).find(".item-header").text();
  $("#thuoc-json").val(value);
  const rowCount = $("#dvKyThuat tr").length + 1;
  // Thêm hàng mới vào bảng mauToaThuoc
  const row2 = `
      <tr>
        <td>${rowCount}</td> <!-- Cột số thứ tự sẽ được cập nhật -->
        <td><input class="name-thuoc" type="text" value="${textData}"></td>
        <td></td> <!-- Hoạt chất, có thể lấy từ data -->
        <td><input class="name-thuoc" type="text" value=""></td> <!-- Số ngày -->
        <td></td> <!-- ĐVT -->
        <td><input class="name-thuoc" type="text" value=""></td><!-- Sáng -->
        <td><input class="name-thuoc" type="text" value=""></td><!-- Trưa -->
        <td><input class="name-thuoc" type="text" value=""></td><!-- Chiều -->
        <td><input class="name-thuoc" type="text" value=""></td><!-- Tối -->
        <td></td> <!-- Cách dùng -->
        <td></td> <!-- Cách ngày -->
        <td><input class="name-thuoc" type="text" value=""></td> <!-- ĐVTdùng -->
        <td><input type="checkbox"></td>
        <td><input type="checkbox"></td>
        <td><span id="btn-delete">&times;</span></td>
      </tr>
    `;
  $("#mauToaThuoc").append(row2); // Thêm hàng vào bảng mauToaThuoc
});

function getDSPhacdo() {
  const tbody = $("#load_data_search");
  const search = $("#searchKey").val();
  $.ajax({
    url: "https://192.168.1.123/QuanLy/QL_MauPhacDo/getDSMauPhacDo",
    type: "POST",
    data: { key: "" },
    success: function (response) {
      console.log(response);
      tbody.empty();
      response
        .filter(function (element) {
          return element.tenMauPhacDo.includes(search);
        })
        .forEach(function (element, index) {
          const row = `<tr data-id1=${element.id}>
                            <td data-id=${element.id}>${index + 1}</td>
                            <td>${element.tenMauPhacDo}</td>
                            <td><button class="btn btn-danger btn-sm delete-btn">xóa</button></td>
                          </tr>`;
          tbody.append(row);
        });
      $("#load_data_search tr").on("click", "td:first", function () {
        var idMau1 = $(this).data("id");
        chitiet(idMau1);
      });

      $(".delete-btn").on("click", function () {
        var idMau2 = $(this).closest("tr").data("id1");
        xoa(idMau2);
      });
    },
  });
}

function chitiet(idMau1) {
  $.ajax({
    url: "https://192.168.1.123/QuanLy/QL_MauPhacDo/getChiTietMauPhacDo",
    type: "POST",
    data: { idMau: idMau1 },
    success: function (response) {
      console.log("Dữ liệu đã được lưu thành công:", response);
      $("#dvKyThuat").empty();
      $("#mauToaThuoc").empty();
      const serviceSelect2 = $("#idInput");
      serviceSelect2.val(response.tenMauPhacDo);
      response.qlMauPhacDoDvktCts.forEach(function (element, index) {
        var isChecked1 = element.ngayLe ? "checked" : "";
        var isChecked = element.tinhDv ? "checked" : "";
        const row1 = `<tr>
                            <td>${index + 1}</td>
                            <td>${element.iddvktNavigation.tenDichVu}</td>
                            <td><input type="text" value="${
                              element.ghiChu
                            }"></td>
                            <td><input type="text" value="${
                              element.soLuong
                            }"></td>
                            <td><input type="text" value="${
                              element.soLanMoiNgay
                            }"></td>
                            <td><input type="text" value="${
                              element.soNgay
                            }"></td>
                            <td><input type="text" value="${
                              element.cachNgay
                            }"></td>
                            <td>${element.soLuong}</td>
                            <td><input type="checkbox" ${isChecked1}></td>
                            <td><input type="checkbox" ${isChecked}></td>
                            <td><button class="btn btn-danger btn-sm delete-btn">Xóa</button></td>
                        </tr>`;
        $("#dvKyThuat").append(row1);
      });

      response.qlMauPhacDoThuocCts.forEach(function (element, index) {
        var isChecked = element.tinhDv ? "checked" : "";
        const row2 = `<tr>
                        <td>${index + 1}</td>
                        <td>${element.idhangHoaNavigation.tenHangHoa}</td>
                        <td>${element.idhangHoaNavigation.hoatChat}</td>
                        <td>${element.soNgay}</td>
                        <td>${
                          element.idhangHoaNavigation.iddonViTinhXuatNavigation
                            .tenDvt
                        }</td>
                        <td>${element.sang}</td>
                        <td>${element.trua}</td>
                        <td>${element.chieu}</td>
                        <td>${
                          element.idhangHoaNavigation.idduongDungNavigation
                            .tenDuongDung
                        }</td>
                        <td>${element.soLanMoiNgay}</td>
                        <td>${
                          element.idhangHoaNavigation.iddonViTinhXuatNavigation
                            .tenDvt
                        }</td>   
                        <td>${element.tongSoLuong}</td>
                        <td><input type = "checkbox" ${isChecked}></td>   
                         <td><button class="btn btn-danger btn-sm delete-btn">xóa</button></td>
                        </td>
                        </tr>`;
        $("#mauToaThuoc").append(row2);
      });
    },
    error: function (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      alert("Lỗi khi lưu dữ liệu!");
    },
  });
}

// function xoa(idMau2) {
//   if (!idMau2) {
//     alert("ID không hợp lệ hoặc bị thiếu!");
//     return;
//   }

//   $.ajax({
//     url: "https://192.168.1.123/QuanLy/QL_MauPhacDo/xoaPhacDoMau",
//     type: "POST",
//     data: { idMau: idMau2 },
//     success: function (response) {
//       console.log("Dữ liệu đã được xóa thành công:", response);
//       alert("Dữ liệu đã được xóa thành công!");
//     },
//     error: function (error) {
//       console.error("Lỗi khi lưu dữ liệu:", error);
//       alert("Lỗi khi lưu dữ liệu!");
//     },
//   });
// }

function update() {
  $("#saveButton").on("click", function () {
    const idMauPhacDo = $("#load_data_search tr").data("id1"); // Thay đổi cách chọn ID nếu cần
    console.log(idMauPhacDo);

    if (!idMauPhacDo) {
      alert("Vui lòng chọn mẫu phác đồ để lưu.");
      return;
    }

    const section2Data = [];
    $("#dvKyThuat tr").each(function () {
      const row = $(this);
      const inputData = row
        .find("input")
        .map(function () {
          return $(this).val();
        })
        .get();
      section2Data.push({
        ten: row.find("td:nth-child(2)").text(),
        inputs: inputData,
      });
    });

    const section3Data = [];
    $("#mauToaThuoc tr").each(function () {
      const row = $(this);
      const inputData = row
        .find("input")
        .map(function () {
          return $(this).val();
        })
        .get();
      section3Data.push({
        ten: row.find("td:nth-child(2)").text(),
        inputs: inputData,
      });
    });

    const dataToSend = {
      qlMauPhacDo: {
        Id: idMauPhacDo || "20046",
        TenMauPhacDo: $("#mauPhacDoTen").val() || "dạ dày Hp",
        MaBenhChinh: "K29",
        TenBenhChinh: "Viêm dạ dày và tá tràng[K29]",
        IdKhoa: "3",
      },
      qlMauPhacDoDvktCtMaps: section2Data.map((item) => ({
        Iddvkt: item.ten,
        SoNgay: item.inputs[0],
        SoLuong: item.inputs[1],
        SoLanMoiNgay: item.inputs[2],
        CachNgay: item.inputs[3],
        NgayLe: item.inputs[4] === "on",
        TinhDv: true,
        Bhyt: item.inputs[5] === "on",
        GhiChu: item.inputs[6],
      })),
      qlMauPhacDoThuocCtMaps: section3Data.map((item) => ({
        IdhangHoa: item.ten,
        Stt: item.inputs[0],
        SoNgay: item.inputs[1],
        IddonViTinhDung: item.inputs[2],
        TongSoLuong: item.inputs[3],
        CachNgay: item.inputs[4],
        CachDungKhac: item.inputs[5],
        SoLuongKe: item.inputs[6],
        TinhDV: true,
        Bhyt: "",
        TenDuongDung: "",
        DacBiet: false,
        Sang: item.inputs[7],
        Trua: "",
        Chieu: "",
        Toi: "",
        MaLoaiToaThuoc: "",
        TenDonViTinhDung: "",
      })),
    };
    console.log(dataToSend);

    $.ajax({
      url: "https://192.168.1.123/QuanLy/QL_MauPhacDo/updateMauPhacDo",
      type: "POST",
      data: JSON.stringify(dataToSend),
      success: function (response) {
        alert("Dữ liệu đã được lưu thành công!");
        console.log(response);
      },
      error: function (xhr, status, error) {
        alert("Có lỗi xảy ra: " + xhr.responseText);
      },
    });
  });
}
update();
$(document).ready(function () {
  $("#them").click(function () {
    $("#dvKyThuat").empty();
    $("#mauToaThuoc").empty();
    $("#search-dvkt").empty();
    $("#search-thuoc").empty();
    $("#search-dvkt").val(""); // Xóa giá trị trong ô tìm kiếm
    $("#search-thuoc").val(""); // Xóa giá trị trong ô tìm kiếm
  });
});
