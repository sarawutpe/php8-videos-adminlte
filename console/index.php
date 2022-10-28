<?php include "./header.php" ?>
<?php include "./sidebar.php" ?>

<div class="p-2">
  <button type="button" class="btn btn-primary" onclick="openAddModal()">
    <i class="fas fa-plus"></i> Add Video
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
                <th>Category</th>
                <th>Description</th>
                <th>Url</th>
                <th>Thumb</th>
                <th>View Count</th>
                <th>Like Count</th>
                <th>Dislike Count</th>
                <th>Tags</th>
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
          <h4 id="modal-title" class="modal-title">Add Video</h4>
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
            <div class="form-group">
              <label for="categories">Select Categoty</label>
              <select class="form-control" id="categories" style="width: 100%" required></select>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea class="form-control" rows="4" id="description" placeholder="Enter description"></textarea>
            </div>
            <div class="form-group">
              <label for="video_url">Url</label>
              <input type="url" class="form-control" id="video_url" placeholder="Enter url" required>
            </div>
            <div class="form-group">
              <label for="file">Video Thumbnal</label>
              <img id="previewFile" src="" class="img-fluid mb-2 w-100" style="height: 300px; object-fit: cover" alt="">
              <input type="file" id="thumb_url" onchange="onChangeFile(this)" accept="image/*">
            </div>
            <div class="form-group">
              <label for="video_tags">Select video</label>
              <select multiple="multiple" id="video_tags" data-placeholder="Select a Tags" style="width: 100%;" required>
              </select>
            </div>
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" id="is_active" checked>
              <label class="custom-control-label" for="is_active">Active</label>
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
</div>

<!-- edit modal -->
<div class="modal fade" id="edit-modal">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <form id="edit-form" action="" method="post">
        <div class="modal-header">
          <h4 id="modal-title" class="modal-title">Edit Video</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="card-body">
            <div class="form-group">
              <label for="title">Id</label>
              <input type="text" class="form-control" id="_id" placeholder="" disabled>
            </div>
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" class="form-control" id="_title" placeholder="Enter title" required>
            </div>
            <div class="form-group">
              <label id="_categories2">Select Categoty</label>
              <select class="form-control" id="_categories" style="width: 100%" required></select>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea class="form-control" rows="4" id="_description" placeholder="Enter description"></textarea>
            </div>
            <div class="form-group">
              <label for="video_url">Url</label>
              <input type="url" class="form-control" id="_video_url" placeholder="Enter url" required>
            </div>
            <div class="form-group">
              <label for="file">Video Thumbnal</label>
              <img id="_previewFile" src="" class="img-fluid mb-2 w-100" style="height: 300px; object-fit: cover" alt="">
              <input type="file" id="_thumb_url" onchange="onChangeFile(this)" accept="image/*">
            </div>
            <div class="form-group">
              <label for="_video_tags">Select video</label>
              <select multiple="multiple" id="_video_tags" data-placeholder="Select a Tags" style="width: 100%;" required>
              </select>
            </div>
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" id="_is_active" checked>
              <label class="custom-control-label" for="is_active">Active</label>
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
</div>

<script src="./plugins/select2/js/select2.full.min.js" defer></script>
<script>
  $(document).ready(function() {
    render();
    getCategories()
    getTags()
  });

  function render() {
    const url = "http_client.php?action=GET_VIDEOS"
    $.ajax({
      type: "POST",
      url: url,
      data: {},
      dataType: "json",
      encode: true,
    }).done(function(data) {
      const rows = data.data;
      var html = '';
      rows.map((rows, index) => {
        let test = `${JSON.stringify(rows)}`;
        html += `
        <tr>
          <td>${index+1}</td>
          <td>${rows.id}</td>
          <td style="max-width: 200px;">${rows.title}</td>
          <td style="max-width: 200px;">
            <span class="badge bg-success ">
            ${rows.categories.title}
            </span>
          </td>
          <td style="max-width: 200px;">${rows.description}</td>
          <td style="max-width: 200px">${rows.video_url}</td>
          <td>
          <img src="http://localhost/public/${rows.thumb_url}" style="height: 30px; object-fit: cover" alt="">
          </td>
          <td>${rows.view_count}</td>
          <td>${rows.like_count}</td>
          <td>${rows.dislike_count}</td>
          <td>
            ${rows.tags.map((tag) => `<span class="badge bg-primary mr-1">${tag.title}</span>`).join(' ')}
          </td>
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
      $("table").DataTable();
    }).fail(function(error) {
      console.error(error)
      Toast.fire({
        icon: 'error',
        title: 'error'
      })
    });
  }

  function getCategories() {
    const url = "http_client.php?action=GET_CATEGORIES"
    $.ajax({
      type: "POST",
      url: url,
      data: {},
      dataType: "json",
      encode: true,
    }).done(function(data) {
      const rows = data.data;
      var html = '';
      rows.map((rows, index) => {
        html += `<option id="${rows.id}">${rows.title}</<option>`;
      })
      $("#categories").html(html)
      $("#categories").select2()
      $("#_categories").html(html)
      $("#_categories").select2()
    }).fail(function(error) {
      console.error(error)
      Toast.fire({
        icon: 'error',
        title: 'error'
      })
    })
  }

  function getTags() {
    const url = "http_client.php?action=GET_TAGS"
    $.ajax({
      type: "POST",
      url: url,
      data: {},
      dataType: "json",
      encode: true,
    }).done(function(data) {
      const rows = data.data;
      var html = '';
      rows.map((rows, index) => {
        html += `<option id="${rows.id}">${rows.title}</<option>`;
      })
      $('#video_tags').html(html)
      $("#video_tags").select2();
      $('#_video_tags').html(html)
      $("#_video_tags").select2();
    }).fail(function(error) {
      console.error(error)
      Toast.fire({
        icon: 'error',
        title: 'error'
      })
    })
  }

  function onChangeFile(file) {
    const objectURL = URL.createObjectURL(file.files[0])
    if (objectURL) {
      if (!$("#_id").val()) {
        $('#previewFile').attr('src', objectURL)
      } else {
        $('#_previewFile').attr('src', objectURL)
      }
    }
    return
  }

  var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000
  });

  function openAddModal() {
    $("form").trigger('reset')
    $('#add-modal').modal('toggle')
  }

  function openEditModal(data) {
    $('#_title').val(data.title);
    $('#_id').val(data.id);
    $('#_description').val(data.description);
    $('#_video_url').val(data.video_url);
    // preview file
    const previewFile = $('#_previewFile');
    if (previewFile) {
      previewFile.attr('src', "http://localhost/public/" + data.thumb_url)
    }
    $('#_is_active').prop('checked', data.is_active);
    // categories
    $('#_categories').select2().val(data.categories.title).trigger('change')
    const defaultTags = [data.tags.map((tag) => tag.title)]
    // video tags
    $('#_video_tags').select2().val(defaultTags[0]).trigger('change')
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
        const url = "http_client.php?action=DELETE_VIDEO&id=" + formData.id
        $.ajax({
          type: "POST",
          url: url,
          data: formData,
          dataType: "json",
          encode: true,
        }).done(function(data) {
          render()
        }).fail(function(error) {
          console.error(error)
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
    const formData = new FormData();
    const selectedTags = []
    const videoTags = $('#video_tags').find(':selected')
    for (let i = 0; i < videoTags.length; i++) {
      selectedTags.push(videoTags[i].id)
    }

    formData.append('category_id', $('#categories').find(':selected')[0].id)
    formData.append('video_tags', JSON.stringify(selectedTags))
    formData.append('title', $("#title").val())
    formData.append('description', $("#description").val())
    formData.append('video_url', $("#video_url").val())
    formData.append('thumb_url', $("#thumb_url")[0].files[0])
    formData.append('is_active', $("#is_active").prop('checked'))

    const url = "http_client.php?action=ADD_VIDEO"
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      processData: false,
      contentType: false,
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

  $("#edit-form").submit(function(event) {
    event.preventDefault()
    const formData = new FormData();
    const selectedTags = []
    const videoTags = $('#_video_tags').find(':selected')
    for (let i = 0; i < videoTags.length; i++) {
      selectedTags.push(videoTags[i].id)
    }
    formData.append('id', $('#_id').val())
    formData.append('title', $('#_title').val())
    formData.append('category_id', $('#_categories').find(':selected')[0].id)
    formData.append('video_tags', JSON.stringify(selectedTags))
    formData.append('description', $("#_description").val())
    formData.append('video_url', $("#_video_url").val())
    const file = $("#_thumb_url")[0].files[0]
    if (file) {
      formData.append('thumb_url', file)
    }
    formData.append('is_active', $("#_is_active").prop('checked'))
    const url = "http_client.php?action=UPDATE_VIDEO&id=" + $('#_id').val()
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      processData: false,
      contentType: false,
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
</script>

<?php include "./footer.php" ?>