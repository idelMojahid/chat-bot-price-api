# In[ ]:
#  coding: utf-8

###### Searching and Downloading Google Images to the local disk ######

# Import Libraries
import time  # Importing the time library to check the time of code execution
import sys  # Importing the System Library
import os
import argparse
import ssl




# Downloading entire Web Document (Raw Page Content)
def download_page(url):
    version = (3, 0)
    cur_version = sys.version_info
    if cur_version >= version:  # If the Current Version of Python is 3.0 or above
        import urllib.request  # urllib library for Extracting web pages
        try:
            headers = {}
            headers[
                'User-Agent'] = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
            req = urllib.request.Request(url, headers=headers)
            resp = urllib.request.urlopen(req)
            respData = str(resp.read())
            return respData
        except Exception as e:
            print(str(e))
    else:  # If the Current Version of Python is 2.x
        import urllib2
        try:
            headers = {}
            headers['User-Agent'] = "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.27 Safari/537.17"
            req = urllib2.Request(url, headers=headers)
            try:
                response = urllib2.urlopen(req)
            except URLError: # Handling SSL certificate failed
                context = ssl._create_unverified_context()
                response = urlopen(req,context=context)
            page = response.read()
            return page
        except:
            return "Page Not found"


# Finding 'Next Image' from the given raw page
def _images_get_next_item(s):
    start_line = s.find('rg_di')
    if start_line == -1:  # If no links are found then give an error!
        end_quote = 0
        link = "no_links"
        return link, end_quote
    else:
        start_line = s.find('"class="rg_meta"')
        start_content = s.find('"ou"', start_line + 1)
        end_content = s.find(',"ow"', start_content + 1)
        content_raw = str(s[start_content + 6:end_content - 1])
        return content_raw, end_content


# Getting all links with the help of '_images_get_next_image'
def _images_get_all_items(page):
    items = []
    while True:
        item, end_content = _images_get_next_item(page)
        if item == "no_links":
            break
        else:
            items.append(item)  # Append all the links in the list named 'Links'
            time.sleep(0.1)  # Timer could be used to slow down the request for image downloads
            page = page[end_content:]
    return items


############## Main Program ############
# Taking command line arguments from users
def search_tag(query) :
    
    #query = 'samsung s7'
    search_keyword = query
    version = (3,0)
    cur_version = sys.version_info
    if cur_version >= version:  # If the Current Version of Python is 3.0 or above
        # urllib library for Extracting web pages
        from urllib.request import Request, urlopen
        from urllib.request import URLError, HTTPError

    else:  # If the Current Version of Python is 2.x
        # urllib library for Extracting web pages
        from urllib2 import Request, urlopen
        from urllib2 import URLError, HTTPError

    # Download Image Links
    items = []
    search_term = search_keyword
    search = search_term.replace(' ', '%20')
    url = 'https://www.google.com/search?q=' + search + '&espv=2&biw=1366&bih=667&site=webhp&source=lnms&tbm=isch' 
    raw_html = (download_page(url))
    time.sleep(0.1)
    items = items + (_images_get_all_items(raw_html))
    link_picture = ''
    for item in items :
        link_split = item.split('.')
        extension = link_split[-1]
        if extension == 'jpg' :
            link_picture  = item
            break
    return link_picture
