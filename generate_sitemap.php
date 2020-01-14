<?php
// turn this on if you want to check things
// ini_set("display_errors", "1");
// error_reporting(E_ALL);

//// this may take more than 30 secs...
set_time_limit(1000);
//// fetching all nodes
$raw = getURL("https://dha.acdh.oeaw.ac.at/en/api_0_1/nodes.json?pagesize=all");
//// decoding JSON to associative array
$nodes = json_decode ($raw, true);

$xmlDoc = new DOMDocument();
$root = $xmlDoc->appendChild($xmlDoc->createElement("urlset"));
$root->appendChild($xmlDoc->createAttribute("xmlns"))->appendChild($xmlDoc->createTextNode("http://www.sitemaps.org/schemas/sitemap/0.9"));
foreach ($nodes as $node) {
    $url = "";
    $priority = "";
    switch ($node['schema:additionalType']) {
        case 'schema:creativework':
            $url = "https://digital-humanities.at/en/dha/s-project/" . $node['schema:url']['alias'];
            $priority = 0.8;
            break;
        case 'schema:webpage':
            if($node['schema:primaryImageOfPage'] != "") {
                $url = "https://digital-humanities.at/en/dha/" . str_replace('-', '', $node['schema:url']['alias']);
                $priority = 1.0;
            }
            break;
        case 'schema:event':
            $url = "https://digital-humanities.at/en/dha/s-news/" . $node['schema:url']['alias'];
            $priority = 0.8;
            break;
        case 'schema:event':
            $url = "https://digital-humanities.at/en/dha/s-news/" . $node['schema:url']['alias'];
            $priority = 0.4;
            break;
        case 't_organisation':
            $url = "https://digital-humanities.at/en/dha/s-knowmore/" . $node['schema:url']['alias'];
            $priority = 0.4;
            break;
        case 't_resource':
            $url = "https://digital-humanities.at/en/dha/s-knowmore/" . $node['schema:url']['alias'];
            $priority = 0.4;
            break;
        case 't_reading':
            $url = "https://digital-humanities.at/en/dha/s-knowmore/" . $node['schema:url']['alias'];
            $priority = 0.4;
            break;
        case 't_software':
            $url = "https://digital-humanities.at/en/dha/s-knowmore/" . $node['schema:url']['alias'];
            $priority = 0.4;
            break;
    }
    if($url == "") continue;
    $nodeEl = $root->appendChild(
        $xmlDoc->createElement("url")
    );
    $nodeEl->appendChild(
        $xmlDoc->createElement("loc"))->appendChild(
        $xmlDoc->createTextNode($url)
    );
    $nodeEl->appendChild(
        $xmlDoc->createElement("lastmod"))->appendChild(
        $xmlDoc->createTextNode(date('Y-m-d', $node['schema:dateModified']))
    );
    $nodeEl->appendChild(
        $xmlDoc->createElement("changefreq"))->appendChild(
        $xmlDoc->createTextNode("monthly")
    );
    $nodeEl->appendChild(
        $xmlDoc->createElement("priority"))->appendChild(
        $xmlDoc->createTextNode($priority)
    );
}
$xmlDoc->preserveWhiteSpace = false;
$xmlDoc->formatOutput = true;
$filehandle = fopen("sitemap.xml", "w");
fwrite($filehandle, $xmlDoc->saveXML());
fclose($filehandle);
echo $xmlDoc->saveXML();

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
?>
