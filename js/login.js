/*
MCCodes FREE
js/login.js Rev 1.1.0
Copyright (C) 2005-2012 Dabomstew

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/
function getCookieVal(offset)
{
    let endstr = document.cookie.indexOf(";", offset);
    if (endstr === -1)
        {
            endstr = document.cookie.length;
        }
    return unescape(document.cookie.substring(offset, endstr));
}
/**
 * @return {string|null}
 */
function GetCookie(name)
{
    let j;
    const arg = name + "=";
    const alen = arg.length;
    const clen = document.cookie.length;
    let i = 0;
    while (i < clen)
    {
        j = i + alen;
        if (document.cookie.substring(i, j) === arg)
            {
                return getCookieVal(j);
            }
        i = document.cookie.indexOf(" ", i) + 1;
        if (0 === i)
            {
                break;
            }
    }
    return null;
}
function SetCookie(name, value, expires, path, domain, secure)
{
    document.cookie = name + "=" + escape(value)
            + ((expires) ? "; expires=" + expires.toGMTString() : "")
            + ((path) ? "; path=" + path : "")
            + ((domain) ? "; domain=" + domain : "")
            + ((secure) ? "; secure" : "");
}

function DeleteCookie(name, path, domain)
{
    if (GetCookie(name))
    {
        document.cookie = name + "=" + ((path) ? "; path=" + path : "")
                + ((domain) ? "; domain=" + domain : "")
                + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

let usr;
let pw;
let sv;

function getme()
{
    usr = document.login.username;
    pw = document.login.password;
    sv = document.login.save;

    if (null != GetCookie('username'))
    {
        usr.value = GetCookie('username');
        pw.value = GetCookie('password');
    }
    if ('true' === GetCookie('save'))
    {
        sv[0].checked = true;
    }
    else
    {
        sv[1].checked = true;
    }

}
function saveme()
{
    let expdate;
    if (0 !== usr.value.length && 0 !== pw.value.length)
    {
        if (sv[0].checked)
        {
            expdate = new Date();
            expdate.setTime(expdate.getTime() + 31536000000);
            SetCookie('username', usr.value, expdate);
            SetCookie('password', pw.value, expdate);
            SetCookie('save', 'true', expdate);
        }
        if (sv[1].checked)
        {
            DeleteCookie('username');
            DeleteCookie('password');
            DeleteCookie('save');
        }
    }
    else
    {
        alert('You must enter a username/password.');
        return false;
    }
}
