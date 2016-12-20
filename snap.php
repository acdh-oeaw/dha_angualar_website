<?php
$API = 'https://dha.acdh.oeaw.ac.at/en/api_0_1/nodes.json?parameters[nid]=';
$siteRoot = 'http://digital-humanities.at/';

$jsonData = getData($API);
makePage($jsonData[0], $siteRoot);
?>
<!DOCTYPE html>
<html>
<head>
  <base href="/">
  <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
    <title><?php echo $title; ?></title>
    <!--META-->
    <!--facebook-->
    <!--     <meta property="fb:app_id" content="{YOUR_APP_KEY}">
    <meta property="fb:admins" content="{YOUR_ADMIN_KEY}"/> -->

    <!--SEO-->
    <meta name="description" content="<?php echo $description; ?>">
    <meta name="keywords" content="">
    <meta name="author" content="Digital Humanities Austria">

    <!-- Schema.org markup for Google+ -->
    <meta itemprop="name" content="<?php echo $title; ?>">
    <meta itemprop="description" content="<?php echo $description; ?>">
    <meta itemprop="image" content="<?php echo $imageUrl; ?>">

    <!-- Twiter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="Digital Humanities Austria">
    <meta name="twitter:title" content="<?php echo $title; ?>">
    <meta name="twitter:description" content="<?php echo $description; ?>">
    <meta name="twitter:image:src" content="<?php echo $imageUrl; ?>">
    <!--/ Twiter Cards -->

    <!-- Open Graph -->
    <meta property="og:site_name" content="Digital Humanities Austria">
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?php echo $title; ?>" />
    <meta property="og:description" content="<?php echo $description; ?>">
    <meta property="og:image" content="<?php echo $imageUrl; ?>">
    <!--/ Open Graph -->

</head>
<body>
  <img src="<?php echo $imageUrl; ?>">
  <h1><?php echo $title; ?></h1>
  <p><?php echo $description; ?></p>
</body>
</html>
<?php
// Request data from the API
function getData($api) {
    $id = (isset($_GET['id'])) ? $_GET['id'] : 1;
    $rawData = getURL($api.$id);
    return json_decode($rawData, true);
}

function getURL($url){
	$ch = curl_init();
    // set url
    curl_setopt($ch, CURLOPT_URL, $url);
    //return the transfer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $output = curl_exec($ch);
    // close curl -  be nice!
    curl_close($ch);
    return utf8_decode($output);
}

// Prepare variables for HTML
function makePage($node, $siteRoot) {
    global $title;
    global $pageUrl;
    global $description;
    global $imageUrl;
    $imageUrl = $node['schema:image']['src'];
    switch ($node['schema:additionalType']) {
        case 'schema:creativework':
            $pageUrl = $siteRoot . $_GET['lang'] . "/dha/s-project/" . $node['schema:url']['alias'];
            break;
        case 'schema:webpage':
            if($node['schema:primaryImageOfPage'] != "") {
                $pageUrl = $siteRoot . $_GET['lang'] .  "/dha/" . str_replace('-', '', $node['schema:url']['alias']);
            }
            break;
        case 'schema:event':
            $pageUrl = $siteRoot . $_GET['lang'] . "/dha/s-news/" . $node['schema:url']['alias'];
            break;
        case 't_organisation':
            $pageUrl = $siteRoot . $_GET['lang'] . "/dha/s-knowmore/" . $node['schema:url']['alias'];
            break;
        case 't_resource':
            $pageUrl = $siteRoot . $_GET['lang'] . "/dha/s-knowmore/" . $node['schema:url']['alias'];
            break;
        case 't_reading':
            $pageUrl = $siteRoot . $_GET['lang'] . "/dha/s-knowmore/" . $node['schema:url']['alias'];
            break;
        case 't_software':
            $pageUrl = $siteRoot . $_GET['lang'] . "/dha/s-knowmore/" . $node['schema:url']['alias'];
            break;
    }
    $title = $node['schema:headline'];
    $description = $node['schema:description'];
}
?>
