# TrailerRating
Simpel API som lagrar betyg och länkar till filmtrailers i json-fil med frontend renderad i pug.
<table>
	<tr>
   	<td>/</td>	<td>Redirectar till /filter</td>
	</tr>
	<tr>
   	<td>/list</td>	<td>Listar hela listan på Trailers med all info.</td>
	</tr>
	<tr>
   	<td>/add</td>	<td>Ger en formulär för att lägga till ny trailer</td>
	</tr>
	<tr>
   	<td>/add/:title/:link/:rating/:addedBy</td>	<td>Lägger till ny trailer, kräver:<br> :title - Titel,<br>:link - Youtube-ID (allt bakom ”=” i youtube-URLen),<br>:rating - Önskat betyg (1-5),<br>:addedBy - Ditt namn</td>
	</tr>
	<tr>
   	<td>/delete/:id</td>	<td>Tar bort trailer m.h.a. ID (”/list” för att se ID)</td>
	</tr>
	<tr>
   	<td>/edit/:id/:newRating/:changedBy</td>	<td>Ändrar Trailer, kräver:<br>:id - ID på filmen (”/list” för att se ID),<br>:newRating - Önskat nytt betyg (1-5),<br>:changedBy - Ditt namn</td>
	</tr>
	<tr>
   	<td>/rating/:rating</td>	<td>Filtrerar och visar alla trailers med vald rating (1-5)</td>
	</tr>
	<tr>
   	<td>/filter</td>	<td>Visar en formulär med radio buttons för viss filtrering.</td>
	</tr>	
</table>
