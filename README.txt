Subject: mapo
Description: Basic HTML5 application that uses Tizen API (GPS)
URL: https://gitorious.org/mapo/mapo
Licence: GPL-2.0+
Contact: Philippe Coval <rzr(a)gna.org

Mapo is a geolocation application for the Tizen OS, developped with HTML5/CSS3 an jQuery.

http://gitorious.org/mapo


### TODO ###

* TODO [#A] : test on device
* TODO [#A] : nicer UI/UX
* TODO [#B] : map sources selection
* TODO [#B] : convert la,lo to wgs (ie google url to wgs)
* TODO [#B] : bookmarks
* TODO [#C] : share position (mail, im, social)
* TODO [#C] : support more platforms : FireFoxOS, Asha, Ubuntu, bb10, gnome
* TODO [#C] : load navicore input bookmarks
* TODO [#C] : 3D globe and trace curves


### BUG ###

* BUG [#A] : Change of frequency not applied
* BUG [#B] : No record during standby
* BUG [#C] : Only read the 12th first records, even if the write is done because the file size increases


### NOTES ###

Tizen Geolocation issue :
https://developer.tizen.org/forums/native-application-development/device-gps-testing


Select maps source ie :

<select>
<option value="http://www.openstreetmap.org/?&zoom=10&layers=B00FTF&lat={lat}&lon={lon}">OpenStreetMap</option>
<option value="http://maps.google.com/maps?&z={z}&ll=${icbm}">
Google maps
</option>
<!--
Rzr :
url = http://rzr.online.fr/geo/${lat},${lon}

OpenStreetMap :
url = "http://www.openstreetmap.org/?&zoom=10&layers=mapnik&lat=${lat}&lon=${lon}"

Wikimapia :
url = http://www.wikimapia.org/#y=${lat}&x=${lon}&z=13&l=2&m=a&v=2
$s = "http://www.wikimapia.org/#y=" . $la . "&x=" . $lo . "&z=13&l=2&m=a&v=2";
printLink( $s , "Wikimapia" );

Nokia :
url = "http://maps.nokia.com/${lat},${lon},16,0,0,normal.day"
$s = "http://maps.nokia.com/";
$s= $s . $la . "," . $lo . ",16,0,0,normal.day";
printLink( $s , "nokia" );

Bing :
url = "http://www.multimap.com/map/browse.cgi?&scale=5000&icon=x&lat=${lat}&lon=${lon}"
$s = "http://www.bing.com/maps/?&lvl=20&sty=b&cp="; //48.128854~-1.638889"
$s = $s . $la . "~" . $lo ;
printLink( $s , "bing" );

MultiMap :
url = "http://www.multimap.com/map/browse.cgi?&scale=5000&icon=x&lat=${lat}&lon=${lon}"
$s = "http://www.multimap.com/map/browse.cgi?&scale=5000&icon=x&lat=" . $la . "&lon=" . $lo ;
printLink( $s , "Multimap" );

Flick (Iframe not allowed) :
url = "http://www.flickr.com/map?&fLat=48.0867&fLon=-1.5772&zl=10"
$s = "http://www.flickr.com/map?&fLat=" . $la . "&fLon=" . $lo;
printLink( $s , "Flickr" );

GoogleMap :
url = "http://maps.google.com/maps?&z=10&ll=${lat},${lon}"
$s = "http://maps.google.com/maps?&z=" . $z . "&ll=" . $icbm ;
printLink( $s , "Google"  );

Wiggle :
url = "http://wigle.net/gps/gps/Map/onlinemap/?lat1=${lat}&lon1=${lon}"
$s = "http://wigle.net/gps/gps/Map/onlinemap/?lat1=" . $la . "&lon1=" . $lo ;
printLink( $s , "Wigle" );

Geourl :
url = "http://geourl.org/near?lat=${lat}&long=${lon}"
$s = "http://geourl.org/near?lat=" . $la . "&long=" . $lo ;
printLink( $s , "GeoURL" );

Yahoo :
url = "http://maps.yahoo.com/maps_result?&lat=${lat}&lon=${lon}"
$s = "http://maps.yahoo.com/maps_result?&lat=" . $la . "&lon=" . $lo ;
printLink( $s , "yahoo" );

Frappr :
url = "http://www.frappr.com/eracket&z=16&t=0&cx=${lat}&cy=${lon}"
$s = "http://www.frappr.com/eracket&z=16&t=0&cx=" . $la . "&cy=" . $lo ;
printLink( $s , "frappr");

GamesWW7 :
url = "http://games.ww7.be/tools/formsgeneration/test_map_location_input.php?__map_latitude=${lat}&__map_longitude=${lon}&__map_zoom=18&__map_map_type=Hybrid"
$s="http://games.ww7.be/tools/formsgeneration/test_map_location_input.php?__map_latitude=$la&__map_longitude=$lo&__map_zoom=18&__map_map_type=Hybrid";
printLink( $s , "form");

Flasheart :
url = "http://www.flashearth.com/?&z=12.1&r=0&src=2&lat=${lat}&lon=${lon}"
$s="http://www.flashearth.com/?&z=12.1&r=0&src=2&lat=" . $la . "&lon=" . $lo ;
printLink( $s , "swf");

InformationFreeway :
url = "http://www.InformationFreeway.org/?&zoom=12&layers=0B00F000&lat=${lat}&lon=${lon}"
$s="http://www.InformationFreeway.org/?" . "&zoom=12&layers=0B00F000" . "&lat=" . $la . "&lon=" . $lo ;
printLink( $s , "way");


if ( ! isset($icbm)) {
   if ( isset($geo)) { $icbm=$geo; }
   else if ( isset( $la) && isset($lo)) { $icbm="" . $la ."," . $lo; }
}

$la = preg_replace( '/(.*),.*/' , '$1' , $icbm );
$lo = preg_replace( '/.*,(.*)/' , '$1' , $icbm );


function decimalToAngle( $u )
{
 $d = floor( $u );
 $s = ( $u - $d ) * 60. * 60.;
 $m = floor( $s / 60 );
 $s = floor( $s - 60 * $m );
 $t = "" . $d . "d" . $m . "m" . $s . "s";
 return $t;
}


function decimalToCoord( $lo , $la )
{
        $t="";

        $t = $t . ( ( $lo < 0 ) ? "S" : "N"  );
        if ( $lo < 0 ) { $lo = - ($lo) ; }
        $t = $t . decimalToAngle( $lo );

        $t = $t . ( ( $la < 0 ) ? "W" : "E" );
        if ( $la < 0 ) { $la=-($la);}
        $t = $t . decimalToAngle( $la );
        
        return $t;
}


$coord = decimalToCoord( $la , $lo );


	
<!--					<input type="radio" name="provider" id="wikimapia" onclick="refresh()"
						value="http://www.wikimapia.org/#y=${lat}&x=${lon}&z=13&l=2&m=a&v=2"/>
					<label for="wikimapia">Wikimapia</label>

					<input type="radio" name="provider" id="rzr" onclick="refresh()"
						value="http://rzr.online.fr/geo/${lat},${lon}"/> 
					<label for="rzr">Rzr</label>

					<input type="radio" name="provider" id="bing" onclick="refresh()"
						value="http://www.bing.com/maps/embed/?v=2&amp;cp=${lat}~${lon}&amp;lvl=5&amp;dir=0&amp;sty=r&amp;form=LMLTEW&amp;emid=bf64cbe7-ff5a-4400-4fdc-cf8e5e8e01e0"/> 
					<label for="bing">Bing</label>
							
					<input type="radio" name="provider" id="flasheart" onclick="refresh()"
						value="http://www.flashearth.com/?&z=12.1&r=0&src=2&lat=${lat}&lon=${lon}"/> 
					<label for="flasheart">Flashearth</label>
 -->	
-->
