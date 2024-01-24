user login - 

1. userId - 8992
passwd: u345

2. userId - 7996
psswd: u796
-----------------------------
admin login - 

1. 324; psswd: a123
2. 4256 ; passwd: admin123

action=<%=`/user/${userId}/dashboard`%>
<img src="data:<%=result.avatar.mimetype%>;base64,<%=result.avatar.path.toString('base64')%>" alt="user avatar" width="40%" />
