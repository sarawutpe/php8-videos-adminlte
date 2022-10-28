<?php
include_once '../services/db.php';

function uuid(): int
{
  $p = date('m');
  $r = substr(str_shuffle(str_repeat($x = '0123456789', 6)), 0, 6);
  return (int) $p . $r;
}

function saveUploadedFile($thumb_url, $file): string
{
  try {
    if ($file['size'] > 0 && $file['size'] <= 4194304) {
      $file_type = $file['type'];
      $file_ext = "";
      if (preg_match('/(.jpeg)$/', $file_type)) {
        $file_ext = "jpeg";
      } else if (preg_match('/(.jpg)$/', $file_type)) {
        $file_ext = "jpg";
      } else if (preg_match('/(.png)$/', $file_type)) {
        $file_ext = "png";
      } else if (preg_match('/(.gif)$/', $file_type)) {
        $file_ext = "gif";
      } else if (preg_match('/(.webp)$/', $file_type)) {
        $file_ext = "webp";
      } else {
        $file_ext = "";
      }
      $file_name = "thumbs" . uuid() . "." . $file_ext;
      $file_path = '../public/' . $file_name;
      // remove org file
      if ($thumb_url) {
        $unlink_path = "../public/thumbs" . $thumb_url . ".webp";
        unlink($unlink_path);
      }
      // move file
      $move_file = move_uploaded_file($file['tmp_name'], $file_path);
      if ($move_file) {
        return $file_name;
      }
    }
    return "";
  } catch (Exception $e) {
    echo 'Message: ' . $e->getMessage();
  }
}

function deleteFile($path)
{
  $target = "../public/" . $path;
  if (unlink($target)) {
    return true;
  } else {
    return false;
  }
}

if (true) {
  $ACTION_TYPE = $_GET['action'];

  // Videos Services
  // Create video
  if ($ACTION_TYPE === "ADD_VIDEO") {
    try {
      $connection = new SqlConnection();
      $db = $connection->open();

      // Save file
      $upload_file_name = saveUploadedFile("", $_FILES['thumb_url']);

      $id = uuid();
      $category_id = $_POST['category_id'];
      $video_tags_arr = json_decode($_POST['video_tags']);
      $title = $_POST['title'];
      $description = $_POST['description'];
      $video_url = $_POST['video_url'];
      $thumb_url = $upload_file_name;
      $view_count = 0;
      $like_count = 0;
      $dislike_count = 0;
      $is_active = $_POST['is_active'];

      // Add video
      $sql = "INSERT INTO videos(id, category_id, title, description, video_url, thumb_url, view_count, like_count, dislike_count, is_active, created_at, updated_at) VALUES ($id, :category_id, :title, :description, :video_url, :thumb_url, :view_count, :like_count, :dislike_count, :is_active, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
      $stmt = $db->prepare($sql);
      $stmt->bindParam(":category_id", $category_id);
      $stmt->bindParam(":title", $title);
      $stmt->bindParam(":description", $description);
      $stmt->bindParam(":video_url", $video_url);
      $stmt->bindParam(":thumb_url", $thumb_url);
      $stmt->bindParam(":view_count", $view_count);
      $stmt->bindParam(":like_count", $like_count);
      $stmt->bindParam(":dislike_count", $dislike_count);
      $stmt->bindParam(":is_active", $is_active);
      $result = $stmt->execute();

      // Loop add video tags
      foreach ($video_tags_arr as $video_tag) {
        $video_tag_id = uuid();
        $sql = "INSERT INTO video_tags(id, video_id, tag_id, created_at, updated_at) VALUES ($video_tag_id, :video_id, :tag_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(":video_id", $id);
        $stmt->bindParam(":tag_id", $video_tag);
        $result = $stmt->execute();
      }

      // Response
      if ($result) {
        $data = array("success" => true);
        echo json_encode($data);
        http_response_code(200);
      } else {
        $data = array("success" => false);
        echo json_encode($data);
        http_response_code(400);
      }
    } catch (Exception $error) {
      echo $error->getMessage();
      http_response_code(400);
    } finally {
      $connection->close();
    }
  }

  // Get Videos
  if ($ACTION_TYPE === "GET_VIDEOS") {
    try {
      $connection = new SqlConnection();
      $db = $connection->open();

      $sql = "
      SELECT videos.id,
          videos.category_id,
          videos.title,
          videos.description,
          videos.video_url,
          videos.thumb_url,
          videos.view_count,
          videos.like_count,
          videos.dislike_count,
          videos.is_active,
          videos.created_at,
          videos.updated_at,
          categories.id AS categories_id,
          categories.title AS categories_title,
          categories.is_active AS categories_is_active,
          categories.created_at AS categories_created_at,
          categories.updated_at AS categories_updated_at,
          tags.id AS tags_id,
          tags.title AS tags_title,
          tags.is_active AS tags_is_active,
          tags.created_at AS tags_created_at,
          tags.updated_at AS tags_updated_at
      FROM videos
      LEFT OUTER JOIN categories ON videos.category_id = categories.id
      LEFT OUTER JOIN video_tags ON videos.id = video_tags.video_id
      LEFT OUTER JOIN tags ON video_tags.tag_id = tags.id
      ORDER BY videos.updated_at DESC
      ";

      $stmt = $db->prepare($sql);
      $stmt->execute();
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

      // Generate nested object data
      $id_arr = [];
      foreach ($result as $value) {
        if (!in_array($value['id'], $id_arr)) {
          array_push($id_arr, $value['id']);
        }
      }

      $data = [];
      foreach ($id_arr as $id) {
        $video = [];
        $tags_arr = [];
        foreach ($result as $key => $row) {
          if ($id === $row['id']) {
            // first assign
            if (!$video['id']) {
              // assign categories
              $categories = [
                "id" => $row['categories_id'],
                "title" => $row['categories_title'],
                "is_active" => $row['categories_is_active'],
                "created_at" => $row['categories_created_at'],
                "updated_at" => $row['categories_updated_at'],
              ];
              // assign video
              $video['id'] = $row['id'];
              $video['title'] = $row['title'];
              $video['description'] = $row['description'];
              $video['video_url'] = $row['video_url'];
              $video['thumb_url'] = $row['thumb_url'];
              $video['view_count'] = $row['view_count'];
              $video['like_count'] = $row['like_count'];
              $video['dislike_count'] = $row['dislike_count'];
              $video['is_active'] = $row['is_active'];
              $video['created_at'] = $row['created_at'];
              $video['updated_at'] = $row['updated_at'];
              $video['categories'] = $categories;
            }
            $tag = [
              "id" => $row['tags_id'],
              "title" => $row['tags_title'],
              "is_active" => $row['tags_is_active'],
              "created_at" => $row['tags_created_at'],
              "updated_at" => $row['tags_updated_at']
            ];
            array_push($tags_arr, $tag);
            // remove arr
            unset($result[$key]);
          }
        }
        // assign tags
        $video['tags'] = $tags_arr;
        array_push($data, $video);
      }

      // Response
      if (true) {
        $Response = array("success" => true, "data" => $data);
        echo json_encode($Response);
        http_response_code(200);
      } else {
        $Response = array("success" => false);
        echo json_encode($Response);
        http_response_code(400);
      }
    } catch (Exception $error) {
      echo $error->getMessage();
      http_response_code(400);
    } finally {
      $connection->close();
    }
  }

  // Update video
  if ($ACTION_TYPE === "UPDATE_VIDEO") {
    try {
      $connection = new SqlConnection();
      $db = $connection->open();

      $id = $_GET['id'];
      // Save file
      if ($_FILES['thumb_url']) {
        $upload_file_name = saveUploadedFile($id, $_FILES['thumb_url']);
      } else {
        $upload_file_name = "";
      }

      // Update video By Id
      $category_id = $_POST['category_id'];
      $video_tags_arr = json_decode($_POST['video_tags']);
      $title = $_POST['title'];
      $description = $_POST['description'];
      $video_url = $_POST['video_url'];
      $thumb_url = $upload_file_name;
      $view_count = 0;
      $like_count = 0;
      $dislike_count = 0;
      $is_active = $_POST['is_active'];

      // Check thumb video for SQL
      if ($thumb_url) {
        $sql = "UPDATE videos SET category_id=:category_id, title=:title, description=:description, video_url=:video_url, thumb_url=:thumb_url, view_count=:view_count, like_count=:like_count, dislike_count=:dislike_count, is_active=:is_active, updated_at=CURRENT_TIMESTAMP WHERE id=:id";
      } else {
        $sql = "UPDATE videos SET category_id=:category_id, title=:title, description=:description, video_url=:video_url, view_count=:view_count, like_count=:like_count, dislike_count=:dislike_count, is_active=:is_active, updated_at=CURRENT_TIMESTAMP WHERE id=:id";
      }

      $stmt = $db->prepare($sql);
      $stmt->bindParam(":id", $id);
      $stmt->bindParam(":category_id", $category_id);
      $stmt->bindParam(":title", $title);
      $stmt->bindParam(":description", $description);
      $stmt->bindParam(":video_url", $video_url);
      if ($thumb_url) {
        $stmt->bindParam(":thumb_url", $thumb_url);
      }
      $stmt->bindParam(":view_count", $view_count);
      $stmt->bindParam(":like_count", $like_count);
      $stmt->bindParam(":dislike_count", $dislike_count);
      $stmt->bindParam(":is_active", $is_active);
      $result = $stmt->execute();

      // Loop manage video tags
      $video_tags_sql = "SELECT * FROM video_tags WHERE video_id=:id";
      $video_tags_stmt = $db->prepare($video_tags_sql);
      $video_tags_stmt->bindParam(":id", $id);
      $video_tags_stmt->execute();
      $video_tags_result = $video_tags_stmt->fetchAll(PDO::FETCH_ASSOC);

      // Delete video tags
      $original_video_tags = [];
      foreach ($video_tags_result as $value) {
        array_push($original_video_tags, $value['tag_id']);
        if (!in_array($value['tag_id'], $video_tags_arr)) {
          $sql = "DELETE FROM video_tags WHERE id=:id";
          $stmt = $db->prepare($sql);
          $stmt->bindParam(":id", $value['id']);
          $stmt->execute();
        }
      }

      // Create video tags
      foreach ($video_tags_arr as $value) {
        if (!in_array($value, $original_video_tags)) {
          $video_tag_id = uuid();
          $sql = "INSERT INTO video_tags(id, video_id, tag_id, created_at, updated_at) VALUES ($video_tag_id, :video_id, :tag_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
          $stmt = $db->prepare($sql);
          $stmt->bindParam(":video_id", $id);
          $stmt->bindParam(":tag_id", $value);
          $stmt->execute();
        }
      }

      // Response
      if ($result) {
        $data = array("success" => true, "data" => $result);
        echo json_encode($data);
        http_response_code(200);
      } else {
        $data = array("success" => false);
        echo json_encode($data);
        http_response_code(400);
      }
    } catch (Exception $error) {
      echo $error->getMessage();
      http_response_code(400);
    } finally {
      $connection->close();
    }
  }

  // Delete video
  if ($ACTION_TYPE === "DELETE_VIDEO") {
    try {
      $connection = new SqlConnection();
      $db = $connection->open();

      // Delete video by Id
      $id = $_GET['id'];
      $sql = "DELETE FROM videos WHERE id=:id";
      $stmt = $db->prepare($sql);
      $stmt->bindParam(":id", $id);
      $result = $stmt->execute();

      // Delete video tags match video id (FK)
      $del_video_tags_sql = "DELETE FROM video_tags WHERE video_id=:id";
      $del_video_tags_stmt = $db->prepare($del_video_tags_sql);
      $del_video_tags_stmt->bindParam(":id", $id);
      $del_video_tags_stmt->execute();

      // Response
      if ($result) {
        $data = array("success" => true, "data" => $result);
        echo json_encode($data);
        http_response_code(200);
      } else {
        $data = array("success" => false);
        echo json_encode($data);
        http_response_code(400);
      }
    } catch (Exception $error) {
      echo $error->getMessage();
      http_response_code(400);
    } finally {
      $connection->close();
    }
  }

  // CATEGORIES SERVICES
  // Create Categories
  if ($ACTION_TYPE === 'CREATE_CATEGORY') {
    try {
      $connection = new SqlConnection();
      $db = $connection->open();

      $id = uuid();
      $title = $_POST['title'];
      $is_active = $_POST['is_active'];

      // Create category
      $sql = "INSERT INTO categories(id, title, is_active, created_at, updated_at) VALUES ($id, :title, :is_active, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
      $stmt = $db->prepare($sql);
      $stmt->bindParam(":title", $title);
      $stmt->bindParam(":is_active", $is_active);
      $result = $stmt->execute();

      // Response
      if ($result) {
        $data = array("success" => true);
        echo json_encode($data);
        http_response_code(200);
      } else {
        $data = array("success" => false);
        echo json_encode($data);
        http_response_code(400);
      }
    } catch (Exception $error) {
      echo $error->getMessage();
      http_response_code(400);
    } finally {
      $connection->close();
    }
  }

  // Get Categories
  if ($ACTION_TYPE === "GET_CATEGORIES") {
    try {
      $connection = new SqlConnection();
      $db = $connection->open();

      // Get Categories
      $sql = "SELECT * FROM categories ORDER BY updated_at DESC";
      $stmt = $db->prepare($sql);
      $stmt->execute();
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

      // Response
      if ($result) {
        $data = array("success" => true, "data" => $result);
        echo json_encode($data);
        http_response_code(200);
      } else {
        $data = array("success" => false);
        echo json_encode($data);
        http_response_code(400);
      }
    } catch (Exception $error) {
      echo $error->getMessage();
      http_response_code(400);
    } finally {
      $connection->close();
    }
  }

  // Update Category
  if ($ACTION_TYPE === 'UPDATE_CATEGORY') {
    try {
      $connection = new SqlConnection();
      $db = $connection->open();

      $id = $_GET['id'];
      $title = $_POST['title'];
      $is_active = $_POST['is_active'];

      // Update Category
      $sql = "UPDATE categories SET title=:title, is_active=:is_active, updated_at=CURRENT_TIMESTAMP WHERE id=:id";
      $stmt = $db->prepare($sql);
      $stmt->bindParam(":id", $id);
      $stmt->bindParam(":title", $title);
      $stmt->bindParam(":is_active", $is_active);
      $result = $stmt->execute();

      // Response
      if ($result) {
        $data = array("success" => true);
        echo json_encode($data);
        http_response_code(200);
      } else {
        $data = array("success" => false);
        echo json_encode($data);
        http_response_code(400);
      }
    } catch (Exception $error) {
      echo $error->getMessage();
      http_response_code(400);
    } finally {
      $connection->close();
    }
  }

  // Delete Category
  if ($ACTION_TYPE === 'DELETE_CATEGORY') {
    try {
      $connection = new SqlConnection();
      $db = $connection->open();

      // Delete Category By Id
      $id = $_GET['id'];
      $sql = "DELETE FROM categories WHERE id=:id";
      $stmt = $db->prepare($sql);
      $stmt->bindParam(":id", $id);
      $result = $stmt->execute();

      // Find videos and set category to NULL (FK)
      $videos_sql = "UPDATE videos SET category_id = NULL WHERE category_id=:id";
      $videos_stmt = $db->prepare($videos_sql);
      $videos_stmt->bindParam(":id", $id);
      $videos_stmt->execute();

      // Response
      if ($result) {
        $data = array("success" => true);
        echo json_encode($data);
        http_response_code(200);
      } else {
        $data = array("success" => false);
        echo json_encode($data);
        http_response_code(400);
      }
    } catch (Exception $error) {
      echo $error->getMessage();
      http_response_code(400);
    } finally {
      $connection->close();
    }
  }

  // TAGS SERVICES
  // Create Tags
  if ($ACTION_TYPE === 'CREATE_TAG') {
    try {
      $connection = new SqlConnection();
      $db = $connection->open();

      $id = uuid();
      $title = $_POST['title'];
      $is_active = $_POST['is_active'];

      // Create Tag
      $sql = "INSERT INTO tags(id, title, is_active, created_at, updated_at) VALUES ($id, :title, :is_active, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
      $stmt = $db->prepare($sql);
      $stmt->bindParam(":title", $title);
      $stmt->bindParam(":is_active", $is_active);
      $result = $stmt->execute();

      // Response
      if ($result) {
        $data = array("success" => true);
        echo json_encode($data);
        http_response_code(200);
      } else {
        $data = array("success" => false);
        echo json_encode($data);
        http_response_code(400);
      }
    } catch (Exception $error) {
      echo $error->getMessage();
      http_response_code(400);
    } finally {
      $connection->close();
    }
  }

  // Get Tags
  if ($ACTION_TYPE === "GET_TAGS") {
    try {
      $connection = new SqlConnection();
      $db = $connection->open();

      // Get Tags
      $sql = "SELECT id, title, is_active, created_at, updated_at FROM tags ORDER BY updated_at DESC";
      $stmt = $db->prepare($sql);
      $stmt->execute();
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

      // Response
      if ($result) {
        $data = array("success" => true, "data" => $result);
        echo json_encode($data);
        http_response_code(200);
      } else {
        $data = array("success" => false);
        echo json_encode($data);
        http_response_code(400);
      }
    } catch (Exception $error) {
      echo $error->getMessage();
      http_response_code(400);
    } finally {
      $connection->close();
    }
  }

  // Update Tag
  if ($ACTION_TYPE === 'UPDATE_TAG') {
    try {
      $connection = new SqlConnection();
      $db = $connection->open();

      // Update tag by Id
      $id = $_GET['id'];
      $title = $_POST['title'];
      $is_active = $_POST['is_active'];

      $sql = "UPDATE tags SET title=:title, is_active=:is_active, updated_at=CURRENT_TIMESTAMP WHERE id=:id";
      $stmt = $db->prepare($sql);
      $stmt->bindParam(":id", $id);
      $stmt->bindParam(":title", $title);
      $stmt->bindParam(":is_active", $is_active);
      $result = $stmt->execute();

      // Response
      if ($result) {
        $data = array("success" => true);
        echo json_encode($data);
        http_response_code(200);
      } else {
        $data = array("success" => false);
        echo json_encode($data);
        http_response_code(400);
      }
    } catch (Exception $error) {
      echo $error->getMessage();
      http_response_code(400);
    } finally {
      $connection->close();
    }
  }

  // Delete Tag
  if ($ACTION_TYPE === 'DELETE_TAG') {
    try {
      $connection = new SqlConnection();
      $db = $connection->open();

      // Delete tag by id 
      $id = $_GET['id'];
      $sql = "DELETE FROM tags WHERE id=:id";
      $stmt = $db->prepare($sql);
      $stmt->bindParam(":id", $id);
      $result = $stmt->execute();

      // Delete video tags match tag id (FK)
      $del_video_tags_sql = "DELETE FROM video_tags WHERE tag_id=:id";
      $del_video_tags_stmt = $db->prepare($del_video_tags_sql);
      $del_video_tags_stmt->bindParam(":id", $id);
      $del_video_tags_stmt->execute();

      // Response
      if ($result) {
        $data = array("success" => true);
        echo json_encode($data);
        http_response_code(200);
      } else {
        $data = array("success" => false);
        echo json_encode($data);
        http_response_code(400);
      }
    } catch (Exception $error) {
      echo $error->getMessage();
      http_response_code(400);
    } finally {
      $connection->close();
    }
  }
}
