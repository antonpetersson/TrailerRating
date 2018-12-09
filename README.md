# TrailerRating
/	Redirectar till /filter
/list	Listar hela listan på Trailers med all info.
/add	Ger en formulär för att lägga till ny trailer
/add/:title/:link/:rating/:addedBy	"Lägger till ny trailer, kräver: :title - Titel, 
:link - Youtube-ID (allt bakom ”=” i youtube-URLen)
:rating - Önskat betyg (1-5)
:addedBy - Ditt namn"
/delete/:id	Tar bort trailer m.h.a. ID (”/list” för att se ID)
/edit/:id/:newRating/:changedBy	"Ändrar Trailer, kräver:
:id - ID på filmen (”/list” för att se ID)
:newRating - Önskat nytt betyg (1-5
:changedBy - Ditt namn"
/rating/:rating		Filtrerar och visar alla trailers med vald rating (1-5)
/filter	Visar en formulär med radio buttons för viss filtrering.
	
