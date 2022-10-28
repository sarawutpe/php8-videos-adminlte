<?php include "./header.php" ?>
<?php include "./sidebar.php" ?>

<div class="p-2">
  <button type="button" class="btn btn-primary" onclick="openAddModal()">
    <i class="fas fa-plus"></i> Add Tags
  </button>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-12">
      <div class="card p-2">
        <div class="table-responsive">
          <table class="table table-striped" style="width:100%">
            <thead>
              <tr>
                <th style="width: 10px">#</th>
                <th>Id</th>
                <th>Title</th>
                <th>Active</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th style="width: 170px; text-align: center;">Actions</th>
              </tr>
            </thead>
            <tbody id="tbody"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- add modal -->
<div class="modal fade" id="add-modal">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <form id="add-form" action="" method="post">
        <div class="modal-header">
          <h4 id="modal-title" class="modal-title">Add Tags</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="card-body">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" class="form-control" id="title" placeholder="Enter title" required>
            </div>
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" id="is_active" checked>
              <label class="custom-control-label" for="is_active">Active</label>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <button id="close" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Add</button>
        </div>
    </div>
    </form>
  </div>
</div>

<!-- edit modal -->
<div class="modal fade" id="edit-modal">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <form id="edit-form" action="" method="post">
        <div class="modal-header">
          <h4 id="modal-title" class="modal-title">Edit Tags</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="card-body">
            <div class="form-group">
              <label for="title">Id</label>
              <input type="text" class="form-control" id="_id" placeholder="" disabled required>
            </div>
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" class="form-control" id="_title" placeholder="Enter title" required>
            </div>
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" id="_is_active" checked>
              <label class="custom-control-label" for="_is_active">Active</label>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <button id="close" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
    </div>
    </form>
  </div>
</div>

<script>
  $(document).ready(function() {
    render();
  });

  function render() {
    const url = "http_client.php?action=GET_TAGS"
    $.ajax({
      type: "POST",
      url: url,
      data: {},
      dataType: "json",
      encode: true,
    }).done(function(data) {
      console.log(data)
      const rows = data.data;
      var html = '';
      rows.map((rows, index) => {
        html += `
        <tr>
          <td>${index+1}</td>
          <td>${rows.id}</td>
          <td>${rows.title}</td>
          <td>${rows.is_active}</td>
          <td>${dayjs(rows.created_at).format("DD/MM/YYYY HH:mm:ss")}</td>
          <td>${dayjs(rows.updated_at).format("DD/MM/YYYY HH:mm:ss")}</td>
          <td>
            <div class="d-flex justify-content-center">
              <button class="btn btn-info btn-sm mr-1" [data-toggle="modal"] onclick='openEditModal(${JSON.stringify(rows)})' >
                <i class="fas fa-pencil-alt">
                </i>
                Edit
              </button>
              <button class="btn btn-danger btn-sm mr-1" [data-toggle="modal"] onclick='openDeleteModal(${JSON.stringify(rows)})' >
                <i class="fas fa-trash">
                </i>
                Delete
              </button>
            </div>
          </td>
        </tr> 
        `;
      })
      $('#tbody').html(html)
      $("table").DataTable()
    }).fail(function(error) {
      console.error(error)
      Toast.fire({
        icon: 'error',
        title: 'error'
      })
    });
  }

  var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000
  });

  function openAddModal() {
    $('#add-modal').modal('toggle')
  }

  function openEditModal(data) {
    $('#_title').val(data.title);
    $('#_id').val(data.id);
    $('#_is_active').prop('checked', data.is_active);
    $('#edit-modal').modal('toggle')
  }

  function openDeleteModal(data) {
    const formData = {
      id: data.id,
    };
    Swal.fire({
      title: `Are you sure delete ${formData.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const url = "http_client.php?action=DELETE_TAG&id=" + formData.id
        $.ajax({
          type: "POST",
          url: url,
          data: formData,
          dataType: "json",
          encode: true,
        }).done(function(data) {
          render()
        }).fail(function(error) {
          console.log(error)
          Toast.fire({
            icon: 'error',
            title: 'error'
          })
        });
      }
    })
  }

  function closeModal() {
    $('[data-dismiss="modal"]').click()
  }

  $("#add-form").submit(function(event) {
    event.preventDefault()
    const formData = {
      title: $("#title").val(),
      is_active: $("#is_active").prop('checked'),
    };
    const url = "http_client.php?action=CREATE_TAG"
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function(data) {
      render()
      closeModal()
      Toast.fire({
        icon: 'success',
        title: 'Your work has been saved'
      })
      $("form").trigger('reset')
    }).fail(function(error) {
      console.error(error)
      Toast.fire({
        icon: 'error',
        title: 'error'
      })
    });
  });

  $('#edit-form').submit(function(event) {
    event.preventDefault()
    const formData = {
      id: $("#_id").val(),
      title: $("#_title").val(),
      is_active: $("#_is_active").prop('checked'),
    };
    const url = "http_client.php?action=UPDATE_TAG&id=" + formData.id
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function(data) {
      render()
      closeModal()
      Toast.fire({
        icon: 'success',
        title: 'Your work has been saved'
      })
      $("form").trigger('reset')
    }).fail(function(error) {
      console.error(error)
      Toast.fire({
        icon: 'error',
        title: 'error'
      })
    });
  })
</script>

<?php include "./footer.php" ?>