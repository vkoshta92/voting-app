
/*
voting app
 a functality where user can give vote to given set of candidates

 modeks?
 routes?

 functionality
 1. user sign in/ signup
 2.see the list of candidate
 3.vote one of the candidate
 4.there is a route which shows the list of candidate and their live vote counts sorted by their vote count
 5.user data must contain therir one unique govermant id proof : adhar card number
 6.there should be one admin who can only maintain the table of candidates and he cant bale to vote  at all
 7. user can change their password.
 8. user can login with adhar card number and password
9. admin cant vote



Routes
User Authentication:
/signup: POST Create a new user account.
/login: POST Log in to an existing account. I aadhar card number + password ]


Voting: I
/candidates: GET - Get the list of candidates.
/vote/: candidateId: POST - Vote for a specific candidate.


Vote Counts:
/vote/counts: GET - Get the list of candidates sorted by their vote counts.


User Profile:
/profile: GET Get the user's profile information.
/profile/password: PUT Change the user's password.


Admin Candidate Management:
/candidates: POST - Create a new candidate.
/candidates/: candidateId: PUT - Update an existing candidate.
/candidates/: candidateId: DELETE - Delete a candidate from the list.







npminit
npm i express  
npm i mongoose


*/