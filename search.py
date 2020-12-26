import json
import os
import sys

dir = os.path.dirname(os.path.realpath(__file__))+"/comments/"

verbose = False

if (len(sys.argv)) < 2:
    print("please provide a search argument")
    sys.exit()
search = sys.argv[1].lower()
print(f"encoding: {sys.stdout.encoding}")
print(f"searching for: {search}\n")

hits = 0

def hhmmss(t):
    t = int(t)
    return (f"{t//3600}:" if t>=3600 else "") + ("%02d:%02d" % ((t//60)%60, t%60));

for f in os.listdir(dir):
    if not f.endswith(".txt"):
        continue
    fpath = os.path.join(dir, f)
    if verbose:
        print(f)
    with open(fpath, 'r') as file:
        results = ""
        comments = json.loads(file.read())
        for comment in comments:
            if 'c' in comment and type(comment['c']) == list:
                for c in comment['c']: #comment fragments
                    msg = None
                    user = None
                    if 't' in c and c['t'] == 't' and 'm' in c and 'u' in comment: #mixer
                        msg = c['m']
                        user = comment['u']
                    elif 't' in c and 'n' in comment: #twitch
                        msg = c['t']
                        user = comment['n']
                    if msg is not None:
                        if search in msg.lower():
                            hits += 1
                            results += f"[{hhmmss(comment['t'])}] <{user}> {msg}\n"

        if len(results) > 0:
            print(f"VIDEO {f[0:-4]}\n{results}")
            
print(f"{hits} hits total")