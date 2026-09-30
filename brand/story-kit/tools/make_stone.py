# Procedural honed-limestone / light-concrete texture, 1080x1920, warm-neutral stone.
import numpy as np, cv2
from PIL import Image
W,H=1080,1920
rng=np.random.default_rng(928)
def field(sigma,amp):
    n=rng.standard_normal((H,W)).astype(np.float32)
    b=cv2.GaussianBlur(n,(0,0),sigma)
    return b/(b.std()+1e-6)*amp
t=np.linspace(0,1,H,dtype=np.float32)[:,None]
top=np.array([214,211,205],np.float32); bot=np.array([203,200,194],np.float32)
base=top*(1-t[...,None])+bot*t[...,None]
base=np.broadcast_to(base,(H,W,3)).copy()
lum=field(90,2.2)+field(28,1.5)+field(7,1.1)+field(2.0,1.0)+field(0.8,1.2)   # soft mottling, clouding, grain
grain=rng.standard_normal((H,W)).astype(np.float32)*2.2          # fine speckle
lum+=grain
# sparse flecks (fossil / aggregate): mostly dark, a few light
specks=np.zeros((H,W),np.float32)
m=rng.random((H,W))
specks[m<0.0040]=-rng.uniform(10,22,(m<0.0040).sum())
specks[m>0.9985]=rng.uniform(8,14,(m>0.9985).sum())
specks=cv2.GaussianBlur(specks,(0,0),0.6)*1.7
# occasional small pores (2 to 3px), as in honed limestone / concrete
pores=np.zeros((H,W),np.float32)
k=rng.random((H,W))<0.00018
pores[k]=-rng.uniform(40,70,k.sum())
pores=cv2.GaussianBlur(pores,(0,0),1.1)
specks+=pores
lum+=specks
warm=field(120,1.0)   # gentle warm/cool drift
img=base+lum[...,None]
img[...,0]+=warm; img[...,2]-=warm
img=np.clip(img,0,255).astype(np.uint8)
import os
OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','assets','stone-bg.png')
Image.fromarray(img,'RGB').save(OUT,optimize=True)
print('mean',img.reshape(-1,3).mean(0).round(1),'p1',np.percentile(img.mean(2),1),'p99',np.percentile(img.mean(2),99))
for y0 in (130,1230,1520,1700,1840):
    s=img[y0:y0+80,60:1020].reshape(-1,3)
    print(y0,'mean',s.mean(0).round(1),'p0.5 lum',np.percentile(s.mean(1),0.5).round(1))
